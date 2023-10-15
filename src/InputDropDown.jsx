'use client'
import React from 'react'
import styles from './page.module.css'

export default function InputDropDown(props) {
    const [isToggle, setIsToggle] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const inputWidth = props.width || 15;
    function saveToStorage() {
        const newPropsData = props.data
        !newPropsData.includes(inputValue) && newPropsData.push(inputValue)
        localStorage.setItem( props.name , JSON.stringify(newPropsData))
        console.log(newPropsData)
    }
    return (
    <div className={styles.inputDropDown}>
        <input className={styles.inputDropDown_input} onKeyDown={(event) => {
            if (event.key == 'Enter') {
                console.log(event.target.value)
            }}} 
            name={props.name}
            size={inputWidth}
            maxLength={inputWidth}
            value={props.value} 
            onChange={props.onChange} 
            onFocus={() => setIsToggle(true)}
            onBlur={() => setTimeout(() => setIsToggle(false), 500)}
            />
      {isToggle && props &&
        props.data &&
        props.constructor === Object
          ? <div className={styles.inputDropDown_underInput}>
          {props.data.sort().map((name) => {
            return  (
                <>
                <a key={name} onClick={() => { setInputValue(name); setIsToggle(false)}}>
                    <div>{name.toUpperCase().includes(inputValue.toUpperCase()) ? name : null}</div>
                </a>
            
            </>);
      })}
      <button className={styles.inputDropDown_underInputButton} onClick={() => saveToStorage()}>save</button>
      </div>
      
      : null
    }
    
      
    </div>
  )
}