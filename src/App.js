import React from "react";
import API from "./utils/API";
import "../src/App.css";

class App extends React.Component {
  state = {
    search: "",
    employees: [],
    allEmployees: []
  }

  headings = [
    {name: "Profile"},
    {name: "Name"},
    {name: "Email" },
    {name: "Phone" },
  ];

  handleSort = (heading) => {
    if (heading === 'Name') {
      const sortedEmployees = this.state.employees.sort(function (a, b) {
        var nameA = a.name.first.toUpperCase();
        var nameB = b.name.first.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }

        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });

      this.setState({employees: sortedEmployees });
    }

    if (heading === 'Email') {
      const sortedEmails = this.state.employees.sort(function (a, b) {
        var nameA = a.email.toUpperCase();
        var nameB = b.email.toupperCase();

        if (nameA < nameB) {
          return -1;
        }

        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });
      this.setState({ employees: sortedEmails });
    }
  }

  hanldeSearch = (event) => {

    const searchTerms = event.target.value.toLowerCase();

    const filteredEmployees = this.state.allEmployees.filter(
      user => `${user.name.first}${user.name.last}${user.email}`.toLowerCase().includes(searchTerms)

    );

    this.setState({ employees: filteredEmployees });
  };

  componentDidMount() {
    API.getRandomPerson()
    .then(res => {
      console.log({res});
      this.setState({
        employees: res.data.results,
        allEmployees: res.data.results
      })
    })
  };

  render() {
    return (
      <>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4 text-center">Employee Directory</h1>

            <div className="row justify-content-center mb-4">
              <div className="col-sm-6">
                <input 
                  type="search"
                  className="form-control"
                  placeholder="Search"
                  onChange={this.hanldeSearch}
                  />
              </div>
            </div>
          </div>
        </div>


        <div className="container">
          <table className="table table-striped">
            <thead>
              <tr>
                {
                  this.headings.map(heading => (
                    <th scope="col" className="tabs" key={heading.name} onClick={() => this.handleSort(heading.name)}>{heading.name}</th>
                  ))
                },


              </tr>
            </thead>
            <tbody>

              {
                this.state.employees.map(employee => {
                  return (
                    <tr key={employee.id.value}>
                      <td>
                        <img src={employee.picture.thumbnail} atl="employee" />
                      </td>
                      <td>{`${employee.name.first} ${employee.name.last} `}</td>
                      <td>{employee.email}</td>
                      <td>{employee.phone}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>

      </>
    )
  }
}

export default App;
