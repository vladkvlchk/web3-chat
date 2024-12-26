// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MessageBoard {
    struct Message {
        address sender;
        string text;
        uint256 timestamp;
    }

    Message[] public messages;

    event NewMessage(Message message);

    function storeMessage(string memory _text) public {
        messages.push(Message(msg.sender, _text, block.timestamp));
        emit NewMessage(Message(msg.sender, _text, block.timestamp));
    }

    function getAllMessages() public view returns (Message[] memory) {
        return messages;
    }
}
