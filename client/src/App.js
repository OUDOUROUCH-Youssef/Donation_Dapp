import './index.css';
import Web3 from 'web3';
import configuration from './build/contracts/CharityDonation.json';
import CauseForm from './components/addProduct';
import CauseCatalog from './components/allProducts';

const CONTRACT_ADDRESS = configuration.networks['5777'].address;
const CONTRACT_ABI = configuration.abi;

export const web3 = new Web3(window.ethereum ||'http://127.0.0.1:7545'
);
export const contract = new web3.eth.Contract(
  CONTRACT_ABI,
  CONTRACT_ADDRESS
);

function App() {
  

  return (
    <div>
      <div className=' bg-slate-100 w-full h-14 text-center pt-3'>
        <h2 className='text-2xl font-bold'>Dapp Donation</h2>
      </div>
      <div className='grid lg:grid-cols-12 gap-3  pt-5'>
        
        <div className=' lg:col-span-3'>
          <CauseForm />
        </div>
        <div className='lg:col-span-8'>
          <CauseCatalog />
        </div>
      </div>
    </div>
  );
}

export default App;
