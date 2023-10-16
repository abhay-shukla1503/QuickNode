const express = require('express');
const {ethers,JsonRpcProvider} = require('ethers');
const provider = new JsonRpcProvider('https://tiniest-quaint-mound.ethereum-sepolia.discover.quiknode.pro/dbd0673f8a07edaff1e7f01ee3b72f7f9667e3d1/')

const PORT = 3000;
const app = express();
app.use(express.json());


app.get("/get-balance",async(req,res)=>{//core-API
    const balance = await provider.getBalance(
      "0x6d77FA0c0cc1181ba128a25e25594f004e03a141",
      "latest"
    );
    const bal = Number(balance)/1e18;
    
    res.status(200).json(bal);
})

app.get("/get-block",async(req,res)=>{//core-API
    const blockData = await provider.getBlock(
        '0x6fa3fe1482869ec372c47b43974dcb40be29d52acf892db2bb7e771cb1313c1f',
        true
    )
    res.status(200).json(blockData);
})

app.get("/get-nft",async(req,res)=>{//NFT-API
    const heads = await provider.send("qn_fetchNFTs", [
        {
          wallet: "0x6d77FA0c0cc1181ba128a25e25594f004e03a141",
          omitFields: ["traits"],
          page: 1,
          perPage: 10,
          contracts: [
            "0x5728620c25AfDdba052A00A66C34244F071EA0BA"
          ],
        },
      ]);
      res.status(200).json(heads);
})

app.get("/get-nftdet",async(req,res)=>{//NFT-API
    const heads = await provider.send("qn_fetchNFTCollectionDetails", [
        {
          contracts: [
            "0x5728620c25AfDdba052A00A66C34244F071EA0BA"
          ],
        },
      ]);
     // console.log(heads);
      res.status(200).json(heads);
})

app.get("/get-wallet-token-balance",async(req,res)=>{//Token-API
    const heads = await provider.send("qn_getWalletTokenBalance", [
        {
          wallet: "0x6d77FA0c0cc1181ba128a25e25594f004e03a141",
        },
      ]);
      res.status(200).json(heads);
})

app.get("/get-wallet-token-transactions",async(req,res)=>{//Token-API
    const heads = await provider.send("qn_getWalletTokenTransactions", [
        {
          address: "0x6d77FA0c0cc1181ba128a25e25594f004e03a141",
          contract: "0x7D3AEfa484C43D78c8f3BE6521A0578Ea5038A36",
          page: 1,
          perPage: 10,
        },
      ]);
      res.status(200).json(heads);
})


app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
});