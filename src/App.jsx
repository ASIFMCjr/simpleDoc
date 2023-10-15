'use client'
import React from 'react'
import styles from './page.module.css'
import Doc from './Doc'
import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { listen } from '@tauri-apps/api/event';
import jsPDF from 'jspdf';

function App() {
  const [selectedDocument, setSelectedDocument] = useState("default");

  function Docu({ document }) {
    switch(document) {
      case "doc1":
        return <Doc/>
      default:
        return <div>Протокол</div>
    }
}

  function generatePDF() {
    
    const element = document.getElementById("pageprint");
    document.getElementById("reportbox").style.display = "block";
    document.getElementById("reportbox").style.marginTop = "0px"; 
    document.getElementById("pageprint").style.border = "1px solid black";
    html2pdf().from(element).save('download.pdf'); 
    }
    
    function downloadCode(){
    var x = document.getElementById("reportbox");  
    generatePDF();
    setTimeout(function() { window.location=window.location;},3000);}
  useEffect(() => {
    const handleMenuItemClick = (menuItem) => {
      switch(menuItem){
        case 'print':
            javascript:window.print();
            break;
        case 'doc1':
            setSelectedDocument("doc1");
            break;
        default:
            setSelectedDocument("default")
      }
    };
  
    listen('menuItemClicked', (event) => {
      const { payload } = event;
      handleMenuItemClick(payload);
    });
  }, []);



  const emptyArray = [];
  const [isLoaded, setIsLoaded] = React.useState(false)
  useEffect(() => {
  if (localStorage.getItem("fio") === null) {
    localStorage.setItem("fio", JSON.stringify(emptyArray))
  }
  if (localStorage.getItem("vzvodNumber") === null) {
    localStorage.setItem("vzvodNumber", JSON.stringify(emptyArray))
  }
  if (localStorage.getItem("rotaNumber") === null) {
    localStorage.setItem("rotaNumber", JSON.stringify(emptyArray))
  }
  if (localStorage.getItem("rank") === null) {
    localStorage.setItem("rank", JSON.stringify(emptyArray))
  }
  if (localStorage.getItem("address") === null) {
    localStorage.setItem("address", JSON.stringify(emptyArray))
  }
  setIsLoaded(true)
  }, [])
  return (
    <>
    {isLoaded && <main className={styles.main}>

    <Docu document={selectedDocument} />
      
    </main>}
    </>
  )
}

export default App;







