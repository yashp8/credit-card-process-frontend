import React from 'react';

const Cards = (props) => {
  const { cardsData } = props;

  return (
    <>
      <h3>Existing Cards</h3>
      { cardsData.length > 0 && <div className='container'>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Card Number</th>
              <th>Balance</th>
              <th>Limit</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {cardsData.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.cardNumber}</td>
                <td>£{item.balance}</td>
                <td>£{item.limit}</td>
                <td>{item.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
    </>
  );
};

export default Cards;
