import { getDefaultProvider, Wallet } from 'ethers'; // ethers v5
import { Provider, TransactionResponse } from '@ethersproject/providers'; // ethers v5
import { ERC721Client } from '@imtbl/contracts';

const CONTRACT_ADDRESS = '0xba37adbdccae1b1b384fdfaa5abd2ac2bd1d9866';
const PRIVATE_KEY = '7eb0aadecc9087ded57aaa4f0f934372f87b0d0c1127d34db221c39123ab6c2b';
const provider = getDefaultProvider('https://rpc.testnet.immutable.com');

const grantMinterRole = async (
  provider: Provider
): Promise<TransactionResponse> => {
  // Bound contract instance
  const contract = new ERC721Client(CONTRACT_ADDRESS);
  // The wallet of the intended signer of the mint request
  const wallet = new Wallet(PRIVATE_KEY, provider);

  // Give the wallet minter role access
  const populatedTransaction = await contract.populateGrantMinterRole(
    wallet.address, {
  maxPriorityFeePerGas: 100e9,
  maxFeePerGas: 150e9
}
  );
  const result = await wallet.sendTransaction(populatedTransaction);
  return result;
};

grantMinterRole(provider);