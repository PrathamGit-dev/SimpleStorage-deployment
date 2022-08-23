const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"getVal","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"setVal","outputs":[],"stateMutability":"nonpayable","type":"function"}]
const SimpleStorage = web3 => {
    return (
        new web3.eth.Contract(abi, "0x75d0C8C41336AC8E310207605F9034168840117e")
    )
}
export default SimpleStorage
