import Head from 'next/head'
import { useState, useEffect } from 'react'
import 'bulma/css/bulma.css'
import Web3 from 'web3'
import SimpleStorage from './simplestorage'
// import styles from '../styles/VendingMachine.module.css'

export default function Home() {

    const [error, setError] = useState('')

    const [successMsg, setSuccessMsg] = useState('')

    const [value, setValue] = useState('')

    const [web3, setWeb3] = useState(null)

    const [address, setAddress] = useState(null)

    const [vmContract, setVmContract] = useState(null)

    const [val_to_change, setVal_to_Change] = useState(0)

    const [walletButton, setWalletButton] = useState('')

    // const [hello, setHello] = useState()

    useEffect(() => {
        walletButtonHandler()
        if (vmContract){
            getValueHandler()
        
        if (vmContract && address ) getValueHandler()
        }
        else{
            vmContractHandler()
        }
    }, [vmContract, address])

    const vmContractHandler = async () => {
        if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
            try {
                web3 = new Web3(window.ethereum);
                setWeb3(web3)
                
                const vm = SimpleStorage(web3)
                setVmContract(vm)
            }
            catch (err) {
                setError(err.message)
            }
        }
    }

    const getValueHandler = async () => {
        const val = await vmContract.methods.getVal().call()
        // console.log("The value is => ", val)
        setValue(val)
    }

    // const getMyDonutCountHandle = async () => {
    //     // const accounts = await web3.eth.getAccounts()
    //     //gives account of metamask thqat is connected
    //     const count = await vmContract.methods.donutBalances(address).call()
    //     setMyDonutCount(count)
    // }

    const updateVal = (event) => {
        // console.log(`donut quantity :: ${event.target.value}`)
        setVal_to_Change(event.target.value)
    }

    const setValueHandler = async  () => {
        try{
        await vmContract.methods.setVal(val_to_change).send({
            from: address
            // ,
            // value: web3.utils.toWei('0.001', "ether") * buyCount
        })
        // setPurchases(purchases++);
        setSuccessMsg(`${val_to_change} is the new value!!`)
        getValueHandler()
        }
        catch(err){
            setError(err.message)
        }
    }



    const ConnectWalletHandler = async() => {
        // console.log("Connect wallet fired")
        if(typeof window !== "undefined" && typeof window.ethereum !== "undefined"){
            try {
                await window.ethereum.request({method : "eth_requestAccounts"})
                web3 = new Web3(window.ethereum)
                setWeb3(web3)

                const accounts = await web3.eth.getAccounts()
                setAddress(accounts[0])

                // console.log(`current address is ${address}`)
            }
            catch (err) {
                setError("Unable to connect wallet")
            }
        }
        else{
            setError("Install metamask")
        }

        // alert('connect wallet')
    }

    const walletButtonHandler = () => {
        if (address){
            setWalletButton("Connected")
        }
        else{
            setWalletButton("Connect")
        }
    }


    
    return (
        <div>
        <Head>
        <title>SimpleStorage App</title>
        <meta name="description" content="A blockchain vending machine app" />
        </Head>
        <nav className = "navbar mt-4 mb-4">
            <div className="container">
                <div className = "navbar-brand">
                    <h1><b>Simple Storage</b></h1>
                    <h1>Works on Rinkeby testnet</h1>
                </div>
                <div className = "navbar-brand">
                    <button className='button is-primary' onClick={ConnectWalletHandler}>{walletButton}</button>
                </div>
            </div>
        </nav>
        
        <section>
            <div className="container has-text-success">
                <p>{successMsg}</p>
            </div>
        </section>

        <section>
            <div className="container has-text-danger">
                <p>{error}</p>
            </div>
        </section>
        <section>
            <div className="container">
                <h2>Welcome to Simple Storage</h2>
            </div>
        </section>
        <section>
            <div className="container">
                <h2>Current Value: {value}</h2>
            </div>
        </section>
        <section className = "mt-5 ">
            <div className="container">
                <div className="field">
                    <label className="label">
                        Change Value
                    </label>
                    <div className="control">
                        <input onChange={updateVal} type="text" className="input" placeholder='Enter the amount...'/>
                    </div>
                    <button onClick = {setValueHandler} className="button is-primary mt-4">Set it</button>
                </div>
                
            </div>
        </section>
        </div>
    )
}
