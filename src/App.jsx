import { useState } from 'react'
import './App.css'
import calcData from './calcData.js';
import CalcKeyboard from './CalcKeyboard';


function App() {
  const [calcKeyIds, setCalcKeyIds] = useState(calcData.map(keys => keys));
  const [display, setDisplay] = useState('0')
  const [reset, setReset] = useState(false)
  const [prevId, setPrevId] = useState('')
  const [displayLength, setDisplayLength] = useState(0)

  const handleKeyClick = (id) => {
    if (displayLength < 22 ) {
    if (display === '0' && id.match(/\d|\.|\-|\(|\%|-/) || reset && id.match(/\d|\.|\-|\(|\%|-/)) {
      {id !== 'AC' ? setDisplay(id): setDisplay('0')};
      setPrevId(id);
      setReset(false);
      setDisplayLength(eval(displayLength + 1))
    } else if (id === 'AC') {
      setDisplay('0');
      setPrevId('');
      setDisplayLength(0)
    } else if (id === '=') {
      returnFunction();
      setDisplayLength(0)
    } else if (id.match(/\d/) && prevId.length - 1 == prevId.indexOf(')')) {
      setDisplay(display + ' x ' + id);
      setPrevId(id);
      setDisplayLength(displayLength + 3)
    } else if (id.match(/\d|\./) && !prevId.match(/\./)) {
      {prevId === '%' ? setDisplay(display + ' x ' + id): setDisplay(display + id)};
      setPrevId(prevId + id);
      setDisplayLength(displayLength + 1)
    }  else if (id.match(/\d|\(/)) {
      setDisplay(display + id);
      setPrevId(prevId + id);
      setDisplayLength(displayLength + 1)
    }  else if (id === ')' && prevId.match(/\(\d+/)) {
      setDisplay(display + id);
      setPrevId(id);
      setDisplayLength(displayLength + 1)
    } else if (id === "Divide" && display.match(/\d/)) {
        if (display.length < 2) {
        setDisplay(display + ' <i class="fa-solid fa-divide"></i> ');
        setPrevId(id);
        setDisplayLength(displayLength + 3)
      } else if (display.split('')[display.length - 2].match(/\x|\-|\+/)) {
        setDisplay(display.slice(0, display.length - 3) + ' <i class="fa-solid fa-divide"></i> ');
        setPrevId(id);
      } else if (prevId === 'take5') {
        setDisplay(display.slice(0, display.length - 5) + ' <i class="fa-solid fa-divide"></i> ');
        setPrevId(id);
      } else if (prevId === 'take37') {
        setDisplay(display.slice(0, display.length - 37) + ' <i class="fa-solid fa-divide"></i> ');
        setPrevId(id);
      } else if (prevId !== 'Divide') {
        setDisplay(display + ' <i class="fa-solid fa-divide"></i> ');
        setPrevId(id);
        setDisplayLength(displayLength + 3)
      }
    } else if (id === "%" && display.match(/\d/)) {
      if (display.length < 2) {
      setDisplay(display + '%');
      setPrevId(id);
      setDisplayLength(displayLength + 1)
    }  else if (display.split('')[display.length - 2].match(/\x|\-|\+/) && display.length > 2) {
      setDisplay(display.slice(0, display.length - 3) + '%');
      setPrevId(id);
      setDisplayLength(displayLength - 2);
    } else if (prevId === 'Divide') {
      setDisplay(display.slice(0, display.length - 35) + '%');
      setPrevId(id);
      setDisplayLength(displayLength - 2);
    } else {
      setDisplay(display + '%')
      setPrevId(id);
      setDisplayLength(displayLength + 1);
    }
  }  else if (id === "+" && display.match(/\d/)) {
        if (display.length < 2) {
        setDisplay(display + ' + ');
        setPrevId(id);
        setDisplayLength(displayLength + 3);
      }  else if (display.split('')[display.length - 2].match(/\x|\-/) && display.length > 2) {
        setDisplay(display.slice(0, display.length - 3) + ' + ');
        setPrevId(id);
      } else if (prevId === 'Divide') {
        setDisplay(display.slice(0, display.length - 35) + ' + ');
        setPrevId(id);
      } else if (prevId === 'take5') {
        setDisplay(display.slice(0, display.length - 5) + ' + ');
        setPrevId(id);
        setDisplayLength(displayLength + 3);
      } else if (prevId === 'take37') {
        setDisplay(display.slice(0, display.length - 37) + ' + ');
        setPrevId(id);
        setDisplayLength(displayLength + 3);
      } else if (prevId === '-') {
        setDisplay(display.slice(0, display.length - 2) + ' + ');
        setPrevId(id);
        setDisplayLength(displayLength + 3);
      } else if (prevId !== '+') {
        setDisplay(display + ' + ')
        setPrevId(id);
        setDisplayLength(displayLength + 3);
      }
    }  else if (id === "-" && display.match(/\d/)) {
        if (display.length < 2) {
        setDisplay(display + ' - ');
        setPrevId(id);
        setDisplayLength(displayLength + 3);
      }  else if (display.split('')[display.length - 2].match(/\x|\+/)) {
        setDisplay(display + ' -');
        setPrevId('take5');
        setDisplayLength(displayLength + 2);
      } else if (prevId === 'Divide') {
        setDisplay(display + ' -');
        setPrevId('take37');
        setDisplayLength(displayLength + 2);
      } else if (prevId !== '-') {
        setDisplay(display + ' - ')
        setPrevId(id);
        setDisplayLength(displayLength + 3);
      }
    }  else if (id === "X" && display.match(/\d/)) {
        if (display.length < 2) {
        setDisplay(display + ' x ');
        setPrevId(id);
        setDisplayLength(displayLength + 3);
      }  else if (display.split('')[display.length - 2].match(/\-|\+/) && !prevId.match(/\d/)) {
        setDisplay(display.slice(0, display.length - 3) + ' x ');
        setPrevId(id);
      } else if (prevId === 'take5') {
        setDisplay(display.slice(0, display.length - 5) + ' x ');
        setPrevId(id);
      } else if (prevId === 'take37') {
        setDisplay(display.slice(0, display.length - 37) + ' x ');
        setPrevId(id);
      } else if (prevId === 'Divide') {
        setDisplay(display.slice(0, display.length - 35) + ' x ');
        setPrevId(id);
      } else if (prevId !== 'X') {
        setDisplay(display + ' x ')
        setPrevId(id);
        setDisplayLength(displayLength + 3);
      }
    } else if (id === ')' && display.match(/\(/)) {
      setDisplay(display + ')');
      setPrevId(id);
      setDisplayLength(displayLength + 1);
    }
  } else if (id === '=') {
    returnFunction();
    setDisplayLength(0)
  } else if (id === 'AC') {
    setDisplay('0');
    setPrevId('');
    setDisplayLength(0)
  }
  }

  const returnFunction = () => {
    console.log(display.replace(/(?<=\d)\(/g, ' * (').replaceAll('/\d\(\d/g', ' * ').replaceAll(`<i class="fa-solid fa-divide"></i>`, '/').replaceAll('%', ' %').replaceAll('x', '*').split(' ').join(' ').replace('%', '/100'))
    var theFilter = display.replace(/(?<=\d)\(/g, ' * (').replaceAll('/\d\(\d/g', ' * ').replaceAll(`<i class="fa-solid fa-divide"></i>`, '/').replaceAll('%', ' %').replaceAll('x', '*').split(' ').join(' ').replace('%', '/100');
    var result = Function('return ' + theFilter)();
    setDisplay(result.toString());
  }

  return (
    <div className='app vh-100 bg-secondary d-flex justify-content-center align-items-center'>
      <div className="container d-flex align-items-center justify-content-center rounded p-5 bg-dark">
        <div className='calculator'>
        <div id='display' className="display d-flex rounded bg-info my-1 px-2 justify-content-end align-items-center"><h4 className=''><div dangerouslySetInnerHTML={{__html: display}}/></h4></div>
        <CalcKeyboard handleKeyClick={handleKeyClick} calcKeyIds={calcKeyIds} />
        </div>
      </div>
    </div>
  )
}

export default App
