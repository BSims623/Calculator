const CalcKeys = ({calcKeyIds, handleKeyClick}) => {

  return (
    calcKeyIds.map(keys => <div id={keys.id} key={keys.key} className="btn btn-primary d-flex justify-content-center align-items-center" onClick={() => handleKeyClick(keys.key)}>{keys.key === 'Divide' ? <i className="fa-solid fa-divide"></i> :  keys.key}</div>)
  )
}

const CalcKeyboard = ({calcKeyIds, handleKeyClick}) => {


  return (
    <div className="calculator-keyboard">
      <CalcKeys handleKeyClick={handleKeyClick} calcKeyIds={calcKeyIds} />
    </div>  
      )
}

  export default CalcKeyboard