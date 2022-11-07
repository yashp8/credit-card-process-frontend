import React, { useState } from 'react';
import TextInput from './input/TextInput';

const CreateCard = (props) => {
  const { setData, cardType, setSavedCards, getCardType, setCardType } = props;

  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [limit, setLimit] = useState('');
  const [submitError, setSubmitError] = useState('');

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onCardChange = (event) => {
    setCardNumber(event.target.value);
    setSubmitError('');
  };

  const onCardNumberLeave = () => {
    if (cardNumber.replace(/\s/g, '').length >= 13) {
      getCardType(cardNumber.replace(/\s/g, ''));
    } else {
      setCardType('');
    }
  };

  const cardFormat = (value) => {
    value = value.replace(/[^0-9]/gi, '');
    const v = value.replace(/\s+/g, '').substr(0, 19);
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substr(i, 4));
    }
    return parts.length > 1 ? parts.join(' ') : value;
  };

  const onLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    if (
      name.trim() === '' ||
      limit.trim() === '' ||
      cardNumber.replace(/\s/g, '').length < 13
    ) {
      return;
    }
    setSubmitError('');
    const json = {
      id: null,
      name: name,
      cardNumber: cardFormat(cardNumber),
      balance: 0,
      limit: limit,
    };
    const res = await setData(json);
    if (res.status === 'success') {
      setCardNumber('');
      setName('');
      setLimit('');
      setSavedCards((oldArray) => [...oldArray, res.data]);
    }
    if (res.status === 'failed') {
      setSubmitError(res.message);
    }
    console.log(res);
  };

  return (
    <form onSubmit={onSubmitForm}>
      <div className='input-form'>
        <h3>Add</h3>
        <TextInput
          label='Name'
          input={{
            id: 'name',
            autoFocus: 'autoFocus',
            type: 'text',
            value: name,
            onChange: onNameChange,
            required: true,
          }}
        />
      </div>
      <div className='input-form'>
        <TextInput
          label='Card Number'
          input={{
            id: 'cardnumber',
            type: 'text',
            value: cardFormat(cardNumber),
            onChange: onCardChange,
            onBlur: onCardNumberLeave,
            required: true,
          }}
        />
        {cardType}
      </div>
      <div className='input-form'>
        <TextInput
          label='Limit'
          input={{
            id: 'limit',
            type: 'number',
            min: '1',
            step: '1',
            value: limit,
            onChange: onLimitChange,
            required: true,
          }}
        />
      </div>
      <div className='input-form'>
        <button type='submit'>Add</button>
      </div>
      {submitError}
    </form>
  );
};

export default CreateCard;
