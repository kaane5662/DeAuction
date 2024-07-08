/// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract RealEstateToken is ERC721, Ownable {

    struct RealEstateDetails {
        string streetAddress;
        uint256 zipCode;
        string city;
        string propertyType;
        uint256 areaSquareMeters;
        uint8 bedrooms;
        uint8 bathrooms;
        string additionalDetails;
        uint256 price; //in gwei not ether
    }

    uint256 public nextTokenId = 0;
    mapping(uint256=>RealEstateDetails) _tokenDetails;
    mapping(uint256=>string) _tokenURIs;


    event TokenMinted(uint256 tokenId, address owner, RealEstateDetails details, string tokenUri);
    // event TokenPriceSet(uint256 tokenId, uint256 price);
    event TokenUpdated(uint256 tokenId, address owner);
    event TokenPurchased(uint256 tokenId, address from, address to, uint256 price);
    
    constructor() ERC721("RealEstateToken", "RET") Ownable(msg.sender) {}

    //in a production state the onlyOwner must be used in order for only the contract owner to interact with minted tokens to avoid fraudulent listings
    function mint(RealEstateDetails memory details, string memory tokenUri) external {
        uint256 tokenId = nextTokenId;
        _safeMint(msg.sender, tokenId);
        _tokenDetails[tokenId] = details;
        _tokenURIs[tokenId] = tokenUri;
        nextTokenId++;

        emit TokenMinted(tokenId, msg.sender, details, tokenUri);
    }

    function purchaseToken(uint256 tokenId) external payable {
        uint256 price = _tokenDetails[tokenId].price;
        address owner = ownerOf(tokenId);
        require(owner != address(0), "ERC721: Invalid owner");
        require(msg.value == price, "ERC721: Incorrect price");

        _transfer(owner, msg.sender, tokenId);
        payable(owner).transfer(msg.value);
    
        emit TokenPurchased(tokenId, owner, msg.sender, price);
    }
    

    function setTokenDetails(uint256 tokenId, RealEstateDetails memory details) internal virtual {
        require(ownerOf(tokenId) != address(0), "ERC721Metadata: Details set of nonexistent token");
        require(ownerOf(tokenId) == msg.sender, "ERC721Metadata: Only the owner can update this token");
        _tokenDetails[tokenId] = details;
        emit TokenUpdated(tokenId, ownerOf(tokenId));
    }

    function setTokenPrice(uint256 tokenId, uint256 price) external {
        require(ownerOf(tokenId) == msg.sender, "ERC721: Only the owner can set the price");
        _tokenDetails[tokenId].price = price;
        // emit TokenPriceSet(tokenId, price);
    }


    function getToken(uint256 tokenId) public view returns(RealEstateDetails memory, address, string memory){
        require(ownerOf(tokenId) != address(0), "ERC721Metadata: Details query for nonexistent token");
        return (_tokenDetails[tokenId], ownerOf(tokenId), _tokenURIs[tokenId]);
    }

    function getTokenURI(uint256 tokenId) public view returns(string memory){
        require(ownerOf(tokenId) != address(0), "ERC721Metadata: Details query for nonexistent token");
        return (_tokenURIs[tokenId]);
    }

    function getOwnerTokens() public view returns(RealEstateDetails[] memory, string[] memory){
        uint256 count = 0;
    
        // Count the number of tokens owned by the caller
        for (uint256 i = 0; i < nextTokenId; i++) {
            if (ownerOf(i) == msg.sender) {
                count++;
            }
        }
        RealEstateDetails[] memory ownerTokens = new RealEstateDetails[](count);
        string[] memory ownerURIs = new string[](count);
        uint256 index = 0;
        for(uint256 i =0; i < nextTokenId; i++){
            if(ownerOf(i) == msg.sender){
                RealEstateDetails storage token = _tokenDetails[i];
                string storage tokenUri = _tokenURIs[i];
                ownerTokens[index] = token;
                ownerURIs[index] = tokenUri;
                index+=1;
                
            }
        }
        return (ownerTokens, ownerURIs);
    }

    function getTokens() public view returns (RealEstateDetails[] memory, address[] memory, string[] memory){
        RealEstateDetails[] memory allTokens = new RealEstateDetails[](nextTokenId);
        address[] memory allOwners = new address[](nextTokenId);
        string[] memory allURIs = new string[](nextTokenId);
        for(uint256 i =0; i < nextTokenId; i++){
            RealEstateDetails storage token = _tokenDetails[i];
            allTokens[i] = token;
            allOwners[i] = ownerOf(i);
            allURIs[i] = _tokenURIs[i];
        }
        return (allTokens, allOwners, allURIs);
    }



}