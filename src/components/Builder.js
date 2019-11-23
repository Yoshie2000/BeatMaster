import React from 'react';
import './Builder.css';

class Builder extends React.Component {

  constructor(props) {
    super();
    this.props = props;
  }

  render() {

    let rows = [];
    for (let rowIndex = 0; rowIndex < 2; rowIndex++) {
      let cols = [];
      for (let colIndex = 0; colIndex < 4; colIndex++) {
        let col = (
          <td>{rowIndex}/{colIndex}</td>
        );
        cols.push(col);
      }
      let row = (
        <tr>
          {cols}
        </tr>
      )
      rows.push(row);
    }

    return (
      <div className="builder">
        <table className="builder-table" id="builder-table">
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Builder;
