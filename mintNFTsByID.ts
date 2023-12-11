import { getDefaultProvider, Wallet, utils } from "ethers"; // ethers v5
import { Provider, TransactionResponse } from "@ethersproject/providers"; // ethers v5
import { ERC721Client } from "@imtbl/contracts";

const CONTRACT_ADDRESS = "0xba37adbdccae1b1b384fdfaa5abd2ac2bd1d9866";
const PRIVATE_KEY =
  "7eb0aadecc9087ded57aaa4f0f934372f87b0d0c1127d34db221c39123ab6c2b";
const TOKEN_ID1 = 1;
const TOKEN_ID2 = 2;
const TOKEN_ID3 = 3;

const provider = getDefaultProvider("https://rpc.testnet.immutable.com");

const mint = async (provider: Provider): Promise<TransactionResponse> => {
    // Bound contract instance
  const contract = new ERC721Client(CONTRACT_ADDRESS);
  console.log('Contract instance created with address:', CONTRACT_ADDRESS);

  // The wallet of the intended signer of the mint request
  const wallet = new Wallet(PRIVATE_KEY, provider);

  const requests = [
    {
      to: "0x383C86f3394032712dE52e12ECaf24677a042F19",
      tokenIds: [TOKEN_ID1, TOKEN_ID2, TOKEN_ID3],
    },
    ];

  const gasOverrides = {
    maxPriorityFeePerGas: 100e9, // 100 Gwei
    maxFeePerGas: 150e9,
    gasLimit: 200000,
    };

  const populatedTransaction = await contract.populateMintBatch(requests, gasOverrides);

  const result = await wallet.sendTransaction(populatedTransaction);
  console.log("Transaction sent, result:", result); // To get the TransactionResponse value
  return result;
};

mint(provider);