const {ethers} = require("hardhat");
const { expect, looseObjectEquals } = require("chai");

// console.log(ethers)
describe('RealEstateToken', function () {
    let RealEstateToken;
    let realEstateToken;
    let owner;
    let addr1
    let addr2;
    let addr3;

    const realEstate1 = {
        streetAddress: "123 Main St",
        zipCode: 48934,
        propertyType: "Home",
        areaSquareMeters: 254940,
        city: "NY",
        bedrooms: 3,
        bathrooms: 1,
        price: ethers.parseEther("0.000000000000001"),
        additionalDetails: "This is a test description"
    };
    const realEstate2 = {
        streetAddress: "456 Main St",
        zipCode: 24567,
        propertyType: "Home",
        areaSquareMeters: 25000,
        city: "NY",
        bedrooms: 1,
        bathrooms: 4,
        price: 3241,
        additionalDetails: "This is a test description 2"
    };
    const realEstate3 = {
        streetAddress: "789 Main St",
        zipCode: 86543,
        propertyType: "Home",
        areaSquareMeters: 13000,
        city: "NY",
        bedrooms: 4,
        bathrooms: 2,
        price: 3241,
        additionalDetails: "This is a test description 3"
    };
    const tokenURI1 = "0493ifebe0g0ib0ie0bir0t"
    const tokenURI2 = "450094hb05ro-rkbntryk-"
    const tokenURI3 = "bfp nrt ptkhprtookprtpohtrpo"
    
    beforeEach(async function () {
        [owner, addr1, addr2, addr3] = await ethers.getSigners();
        // Deploy the contract
        RealEstateToken = await ethers.getContractFactory('RealEstateToken');
        realEstateToken = await RealEstateToken.deploy();
        
        
    });

    describe('Deployment', function () {
        it('Should set the right owner', async function () {
            expect(await realEstateToken.owner()).to.equal(owner.address);
        });

        it('Should set the right name and symbol', async function () {
            expect(await realEstateToken.name()).to.equal('RealEstateToken');
            expect(await realEstateToken.symbol()).to.equal('RET');
        });
    });

    describe('Minting and Seperate Address purchasing', function () {
        it('Should mint a new token', async function () {
            


            await realEstateToken.connect(addr1).mint(realEstate1, tokenURI1);
            expect(await realEstateToken.getTokenURI(0)).to.equal(tokenURI1)
            const [tokenDetails, ownerAddress, retrievedTokenURI] = await realEstateToken.getToken(0);
            expect(tokenDetails).to.equal(Object.values(realEstate1));
            expect(ownerAddress).to.equal(owner.address);
            expect(retrievedTokenURI).to.equal(tokenURI1);
            
            
        });
        it('Should purchase a new token', async function () {
            
            
            await realEstateToken.connect(addr1).mint(realEstate1, tokenURI1);      
            // expect(await realEstateToken.connect(addr3).purchaseToken(0,{ value: 20000 })).to.be.revertedWith("ERC721: Incorrect price")
            await realEstateToken.connect(owner).purchaseToken(0,{ value: ethers.parseEther("0.000000000000001") })
            const [tokenDetails, ownerAddress, retrievedTokenURI] = await realEstateToken.getToken(0);
            expect(ownerAddress).to.equal(owner.address)
            expect(retrievedTokenURI).to.equal(tokenURI1);
            
                
            
            
        });

        it('Should return existing tokens', async function () {
            
            
            await realEstateToken.connect(addr3).mint(realEstate1, tokenURI1);    
            await realEstateToken.connect(addr1).mint(realEstate1, tokenURI1);    
            await realEstateToken.connect(addr2).mint(realEstate1, tokenURI1);    
            await realEstateToken.getTokens()
            const [tokenDetails, ownerAddresses, retrievedTokenURIs] = await realEstateToken.getTokens();

            expect(tokenDetails).to.equal(Object.values([realEstate1,realEstate2,realEstate3]))
            expect(retrievedTokenURIs).to.equal([tokenURI1,tokenURI2,tokenURI3]);
            expect(ownerAddresses).to.equal([addr3.address,addr1.address,addr2.address]);

            const [tokenDetail2, ownerAddress2, retrievedTokenURI2] = await realEstateToken.getToken(1);
            expect(tokenDetail2).to.equal(Object.values(realEstate2));
            expect(ownerAddress2).to.equal(addr2.address);
            expect(retrievedTokenURI2).to.equal(tokenURI2);
        });

        it('Should return the tokens of the owner', async function () {
            
            
            await realEstateToken.connect(addr3).mint(realEstate1, tokenURI1);    
            await realEstateToken.connect(addr1).mint(realEstate1, tokenURI1);    
            await realEstateToken.connect(addr1).mint(realEstate3, tokenURI2);    
            await realEstateToken.connect(addr1).mint(realEstate2, tokenURI1);    
            await realEstateToken.connect(addr2).mint(realEstate2, tokenURI1);    
            await realEstateToken.connect(addr2).mint(realEstate1, tokenURI1);    
            await realEstateToken.getTokens()
            const [tokenDetails, retrievedTokenURIs] = await realEstateToken.connect(addr1).getOwnerTokens();
            expect(tokenDetails).to.equal(Object.values([realEstate1,realEstate3,realEstate2]))
            expect(retrievedTokenURIs).to.equal([tokenURI1,tokenURI2,tokenURI1]);
        });

    });

    // describe('Creating and Getting', function(){
    //     it("Should mint a new token", async function (){
    //         await realEstateToken.connect().mint()
    //     })
    // })
});