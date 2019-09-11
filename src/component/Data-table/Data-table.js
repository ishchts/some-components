import './index.scss';
import _ from 'lodash';
import React from 'react';
import Loader from './../../Loader';
import Pagination from "react-js-pagination";
import manyFile from "./../../data/many";
import smallFile from "./../../data/small";

class DataTable extends React.Component {
  state = {
    data : [],
    copyData: [],
    firstVisit: true,
    loader: true,
    sortedBy: {
      id : {
        inc : false,
        selected : false,
      },
      firstName : {
        inc: false,
        selected: false,
      },
      lastName : {
        inc: false,
        selected: false,
      },
      email : {
        inc: false,
        selected: false,
      },
      phone : {
        inc: false,
        selected: false,
      },
    },
    activeSorting: '', 
    searchTerm: '',
    selectedUsers: [],
    rowCurrent: null,
    isModal: false,
    isValid: false,
    userTemplate: {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      address: {
        streetAddress: '',
        city: '',
        state: '',
        zip: ''
      },
      description: '',
    },
    activePage: 1,
    itemsCountPerPage: 50,
    totalItemsCount: null,
    pageRangeDisplayed: 5,
  }

  intro = () => {
    // const many = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
    // const small = 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D';
    const many = manyFile;
    const small = smallFile;
    return (
      <form className="intro" onSubmit={e => e.preventDefault()}>
        <span className="intro__title">
          Выберите объем данных
        </span>
        <div className="intro__buttons">
          <button type="sumbit" className="intro__btn btn btn--primary" onClick={() => this.getDataUsers(small)}>Маленький ({this.state.itemsCountPerPage})</button>
          <button type="sumbit" className="intro__btn btn btn--primary" onClick={() => this.getDataUsers(many)}>Большой (1000)</button>
        </div>
      </form>
    )

  }
  //getDataUsers = async (count) =>
  getDataUsers = (count) => {
    this.setState({
      firstVisit: false,
    });
    try {
      // const response = await axios.get(count, {
      //   'Access-Control-Allow-Origin': 'http://www.filltext.com'
      // });
      const response = {
        data: count
      }

      this.setState({
        data: response.data,
        copyData: response.data,
        loader: false,
        totalItemsCount: response.data.length > this.state.itemsCountPerPage ? response.data.length : null,
      });

    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    const that = this;
    document.addEventListener('keydown', function(e) {
      const escape = 27;
      if (e.keyCode === escape && that.state.isModal) {
        that.setState({
          isModal: false,
        })
      }
    })
  }

  filterHandler = (e) => {
    const { copyData } = this.state;
    const newData = copyData.filter(el => {
      if (String(el.id).toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
        return true
      }
      if (el.firstName.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
        return true
      }
      if (el.lastName.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
        return true
      }
      if (el.email.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
        return true
      }
      if (el.phone.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
        return true
      }
      return false;
    })
    this.setState({
      searchTerm: e.target.value,
      data: newData,
      activePage: 1,
      selectedUsers: [],
      rowCurrent: null,
      sortedBy: {
        id: {
          inc: false,
          selected: false,
        },
        firstName: {
          inc: false,
          selected: false,
        },
        lastName: {
          inc: false,
          selected: false,
        },
        email: {
          inc: false,
          selected: false,
        },
        phone: {
          inc: false,
          selected: false,
        },
      },
    });
  }

  decrementSorting = (type) => {
    const arTypeData = [...this.state.data];
    arTypeData.sort((a, b) => {
      if (a[type] > b[type]) {
        return -1;
      }
      return 0;
    });

    this.setState({
      data: arTypeData
    })
  }

  sortingIncrement = (type) => {
    const arTypeData = [...this.state.data];
    arTypeData.sort((a, b) => {
      if (a[type] < b[type]) {
        return -1;
      }
      return 0;
    });

    this.setState({
      data: arTypeData
    })
  }

  sortHandler = type => () => {
    if (this.state.data.length < 3) {
      return;
    }

    const { activeSorting } = this.state;
    if (activeSorting !== '' && activeSorting !== type) {
      this.setState({
        activeSorting: type,
        sortedBy: {
          ...this.state.sortedBy,
          [this.state.activeSorting]: {
            selected: false,
            inc: false,
          },
          [type]: {
            ...this.state.sortedBy[type],
            selected: true,
            inc: true,
          }
        },
      }, () => {
        this.sortingIncrement(type);
      });
      return;
    }
    this.setState({
      activeSorting: type,
      sortedBy: {
        ...this.state.sortedBy,
        [type]: {
          ...this.state.sortedBy[type],
          selected: true,
          inc: !this.state.sortedBy[type].inc,
        }
      }
    }, () => {
        this.state.sortedBy[type].inc ? this.sortingIncrement(type) : this.decrementSorting(type)
    });
  }

  rowHandler = (index) => () => {
    this.setState({
      selectedUsers: [this.state.data[index]],
      rowCurrent: index,
    })
  }

  removeSelectUser = () => {
    this.setState({
      selectedUsers: [],
      rowCurrent: null,
    })
  }

  showModal = () => {
    this.setState({
      isModal: true,
    })
  }

  closeModal = () => {
    this.setState({
      isModal: false,
    })
  }

  handlerAddAdressField = name => e => {
    const { userTemplate } = this.state;
    this.setState({
      userTemplate: {
        ...userTemplate,
        address: {
          ...userTemplate.address,
          [name]: e.target.value,
        }
      }
    }, () => {
      this.setState({
        isValid: this.isValid()
      })
    })
  }

  handlerAddField = name => e => {
    const { userTemplate } = this.state;
    this.setState({
      userTemplate: {
        ...userTemplate,
        [name]: e.target.value,
      }
    }, () => {
      this.setState({
        isValid: this.isValid()
      })
    });

  } 

  isValid = (e) => {
    const { userTemplate } = this.state;
    const { address } = this.state.userTemplate;

    if (address.city === '') {
      return false;
    }
    if (address.state === '') {
      return false;
    }
    if (address.streetAddress === '') {
      return false;
    }
    if (address.zip === '') {
      return false;
    }
    if (userTemplate.id === '') {
      return false;
    }
    if (userTemplate.description === '') {
      return false;
    }
    if (userTemplate.email === '') {
      return false;
    }
    if (userTemplate.firstName === '') {
      return false;
    }
    if (userTemplate.lastName === '') {
      return false;
    }
    return true;
  }

  addUserHandler = () => {
    const { userTemplate } = this.state;

    this.setState({
      data: [{...userTemplate}, ...this.state.data],
      copyData: [{ ...userTemplate }, ...this.state.copyData],
      isModal: false,
      userTemplate: {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        address: {
          streetAddress: null,
          city: null,
          state: null,
          zip: null
        },
        description: null,
      }
    })
  }

  arrowIcon = () => {
    return (
      <svg width="10px" height="10px" enableBackground="new 0 0 292.362 292.362" version="1.1" viewBox="0 0 292.362 292.362"  xmlns="http://www.w3.org/2000/svg">
        <path d="m286.94 69.377c-3.614-3.617-7.898-5.424-12.848-5.424h-255.81c-4.952 0-9.233 1.807-12.85 5.424-3.617 3.621-5.424 7.902-5.424 12.851 0 4.948 1.807 9.229 5.424 12.847l127.91 127.91c3.621 3.617 7.902 5.428 12.85 5.428s9.233-1.811 12.847-5.428l127.91-127.91c3.613-3.617 5.427-7.898 5.427-12.847 0-4.948-1.814-9.229-5.427-12.85z"/>
      </svg>
    )
  }

  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber });
  }

  render() {
    const { data, copyData, itemsCountPerPage, loader, firstVisit, selectedUsers } = this.state;
    const chunkData = _.chunk(data, itemsCountPerPage);

    if (firstVisit) {
      return (
        this.intro()
      )
    }

    if (loader) {
      return (
        <Loader />
      )
    }

    if (data.length === 0 && copyData.length === 0) {
      return (
        <div>Нет данных</div>
      )
    }

    return (
      <div className="App">
        <div className="users">
          <div className="users__head">
            <button type="button" className="users__addButton btn btn--info" onClick={this.showModal}>Добавить пользователя</button>
            <div>
              Фильтровать по: <input type="text" onChange={this.filterHandler} value={this.state.searchTerm} />
            </div>
          </div>
          <div className="users__side">

            {
              selectedUsers.length > 0 ?
                selectedUsers.map((el, i) => (
                  <div key={i} onClick={this.removeSelectUser} className="selectedUser">
                    <div className="selectedUser__group">
                      Выбран пользователь <b>{el.firstName}</b>
                    </div>
                    <div className="selectedUser__group">
                      <div>Описание:</div>
                      <textarea value={el.description} readOnly></textarea>
                    </div>
                    <div className="selectedUser__group">
                      Адрес проживания: <b>{el.address.streetAddress}</b>
                    </div>
                    <div className="selectedUser__group">
                      Город: <b>{el.address.city}</b>
                    </div>
                    <div className="selectedUser__group">
                      Провинция/штат: <b>{el.address.state}</b>
                    </div>
                    <div className="selectedUser__group">
                      Индекс: <b>{el.address.zip}</b>
                    </div>
                  </div>
                ))
                :
                <span className="users__sideTitle">Пользователь не выбран</span>
            }
          </div>
          <div className="users__content">
            <table className="users__table table">
              <thead>
                <tr>
                  <th>
                    <button type="button" onClick={this.sortHandler('id')} className={
                      this.state.sortedBy['id'].selected ?
                        this.state.sortedBy['id'].selected && !this.state.sortedBy['id'].inc ?
                          'active up'
                            :
                              'active'
                                :
                                  null
                    }>ID {this.arrowIcon()}
                    </button>
                    </th>
                    <th><button type="button" onClick={this.sortHandler('firstName')} className={
                      this.state.sortedBy['firstName'].selected ?
                        this.state.sortedBy['firstName'].selected && !this.state.sortedBy['firstName'].inc ?
                          'active up'
                            :
                              'active'
                                :
                                  null
                      }>firstName {this.arrowIcon()}</button>
                    </th>
                    <th><button type="button" onClick={this.sortHandler('lastName')} className={
                      this.state.sortedBy['lastName'].selected ?
                        this.state.sortedBy['lastName'].selected && !this.state.sortedBy['lastName'].inc ?
                          'active up'
                            :
                              'active'
                                :
                                  null
                      }>lastName {this.arrowIcon()}</button>
                    </th>
                    <th><button type="button" onClick={this.sortHandler('email')} className={
                      this.state.sortedBy['email'].selected ?
                        this.state.sortedBy['email'].selected && !this.state.sortedBy['email'].inc ?
                          'active up'
                            :
                              'active'
                                :
                                  null
                      }>email {this.arrowIcon()}</button>
                    </th>
                    <th><button type="button" onClick={this.sortHandler('phone')} className={
                      this.state.sortedBy['phone'].selected ?
                        this.state.sortedBy['phone'].selected && !this.state.sortedBy['phone'].inc ?
                          'active up'
                            :
                              'active'
                                :
                                  null
                      }>phone {this.arrowIcon()}</button>
                    </th>
                </tr>
              </thead>
              <tbody>
                {
                  chunkData.length > 0 ?
                    chunkData[this.state.activePage - 1].map((el, i) => (
                      <tr key={i} onClick={this.rowHandler(i)} className={this.state.rowCurrent === i ? 'current' : null }>
                        <td>{el.id}</td>
                        <td>{el.firstName}</td>
                        <td>{el.lastName}</td>
                        <td>{el.email}</td>
                        <td>{el.phone}</td>
                      </tr>
                    ))
                  :
                    null
                }
              </tbody>
            </table>
            {
              data.length > this.state.itemsCountPerPage ?
                <Pagination
                  activePage={this.state.activePage}
                  itemsCountPerPage={this.state.itemsCountPerPage}
                  totalItemsCount={this.state.totalItemsCount}
                  pageRangeDisplayed={this.state.pageRangeDisplayed}
                  onChange={this.handlePageChange}
                  itemClass="pagination__item"
                  linkClass="pagination__link"
                  activeLinkClass="pagination__current"
                />
                :
                null
            }
          </div>
          {
            this.state.isModal ?
              <div className="modal">
                <div  className="modalOverflow" onClick={this.closeModal}/>
                <form className="form" onSubmit={e => e.preventDefault()}>
                  <fieldset className="fieldset">
                    <label>
                      id 
                      <input type="number" name="id" onChange={this.handlerAddField('id')} value={this.state.userTemplate.id}/>
                    </label>
                    <label>
                      firstName 
                      <input type="text" name="firstName" onChange={this.handlerAddField('firstName')} value={this.state.userTemplate.firstName}/>
                    </label>
                    <label>
                      lastName 
                      <input type="text" name="lastName" onChange={this.handlerAddField('lastName')} value={this.state.userTemplate.lastName}/>
                    </label>
                    <label>
                      email 
                      <input type="text" name="email" onChange={this.handlerAddField('email')} value={this.state.userTemplate.email}/>
                    </label>
                    <label>
                      phone 
                      <input type="text" name="phone" onChange={this.handlerAddField('phone')} value={this.state.userTemplate.phone}/>
                    </label>
                    <label>
                      streetAddress
                      <input type="text" name="streetAddress" onChange={this.handlerAddAdressField('streetAddress')} value={this.state.userTemplate.address.streetAddress}/>
                    </label>
                    <label>
                      city
                      <input type="text" name="city" onChange={this.handlerAddAdressField('city')} value={this.state.userTemplate.address.city}/>
                    </label>
                    <label>
                      state
                      <input type="text" name="state" onChange={this.handlerAddAdressField('state')} value={this.state.userTemplate.address.state}/>
                    </label>
                    <label>
                      zip
                      <input type="text" name="zip" onChange={this.handlerAddAdressField('zip')} value={this.state.userTemplate.address.zip}/>
                    </label>
                    <label>
                      description
                      <input type="text" name="description" onChange={this.handlerAddField('description')} value={this.state.userTemplate.description}/>
                    </label>
                  </fieldset>
                  <div className="modal__buttons">
                    <button type="submit" className="btn btn--primary" onClick={this.addUserHandler} disabled={!this.state.isValid } >Добавить в таблицу</button>
                  </div>
                </form>
              </div> :
                null
          }

        </div>
      </div>
    );

  }
}

export default DataTable;