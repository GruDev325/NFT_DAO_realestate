import Proposal from "./comps/Proposal";
import OptionEditItem from "./comps/OptionEditItem";

import React, { useContext } from "react";
import { injected } from "../ethereum/connectors";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { useEagerConnect, useInactiveListener } from "../ethereum/hooks";
import firebase from "../lib/firebase";

import useStepper from "use-stepper";
import web3 from "../ethereum/web3";
import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Badge,
  Editable,
} from "@chakra-ui/react";

import AppContract from "../assets/abi.json";
/* import AppContract2 from "../assets/abi2.json"; */
import { ContractContext } from "../context/contract";
import { useAuth } from "../context/AuthUserContext";
// const CONTRACT_ADDRESS = AppContract.networks["1"].address;

// console.log("CONTRACT_ADDRESS", CONTRACT_ADDRESS);

import Nft1 from '../images/1.gif';
import Nft2 from '../images/2.gif';
import Nft3 from '../images/3.gif';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Textarea } from '@chakra-ui/react';
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react';
import { ButtonGroup } from '@chakra-ui/react';
import { HStack, VStack } from '@chakra-ui/react';
import { CloseButton } from '@chakra-ui/react';
import { Divider } from '@chakra-ui/react';
import { Spacer } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { Switch } from '@chakra-ui/react';
import { Radio, RadioGroup } from '@chakra-ui/react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { Progress } from '@chakra-ui/react';
import { CLIENT_RENEG_WINDOW } from "tls";

const min = 1;
const defaultValue = 1;
const max = 12;

enum ConnectorNames {
  Injected = "Injected",
}

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
};
function MintComponent() {
  const [supply, setTotalSupply] = React.useState(0);
  const [proposalData, setProposalData] = React.useState([]);
  const [votingResults, setVotingResults] = React.useState([]);

  const context = useWeb3React<Web3Provider>();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>();
  const [instance, setInstance] = React.useState<any>(null);
  /* const [instance2, setInstance2] = React.useState<any>(null); */
  const [accounts, setAccounts] = React.useState([]);
  const [count, setCount] = React.useState(1);
  const [hidden, setHidden] = React.useState(true);
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const { authUser, loading, signOut } = useAuth();
  // const router = useRouter();
  // Listen for changes on loading and authUser, redirect if needed
  React.useEffect(() => {
    !loading && authUser ? setHidden(false) : setHidden(true);
  }, [authUser, loading]);

  React.useEffect(() => {
    if (instance) {
      const getSupply = async () => {
        const totalSupply = await instance.methods.totalSupply().call();
        setTotalSupply(totalSupply);
      };

      getSupply();
    }
  }, [instance]);

  React.useEffect(() => {
    const init = async () => {
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();

      const instance = new web3.eth.Contract(
        // @ts-ignore
        AppContract,
        "0x3D1B7111551114B296912F7DBc954717437Cd45B"
      );


      let proposals = await instance.methods.viewProposals().call();
      if (proposals && proposals.length > 0) {
        setProposalData(proposals);
      }
      /* instance.methods.viewProposals().call().then(function(proposals) { 
        for(let i = 0; i < proposals.length; i++) {
          console.log(proposals[i].title);
        }}); */

      /* const instance2 = new web3.eth.Contract(
        // @ts-ignore
        AppContract2,
        "0x1149ADa967e4815f6465f97E9ac303C0579A0285"
      ); */

      setAccounts(accounts);
      setInstance(instance);
      /* setInstance2(instance2); */
    };

    init();
  }, []);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);
  const currentConnector = connectorsByName["Injected"];
  const activating = currentConnector === activatingConnector;
  const connected = currentConnector === connector;
  const disabled = !triedEager || !!activatingConnector || connected || !!error;

  function validValueClosestTo(desiredNumericValue) {
    return String(Math.min(max, Math.max(desiredNumericValue, min)));
  }

  function integerReducer(state, action) {
    const integerValue = parseInt(state.value, 10);
    switch (action.type) {
      case useStepper.actionTypes.increment: {
        return { value: validValueClosestTo(integerValue + 1) };
      }
      case useStepper.actionTypes.decrement: {
        return { value: validValueClosestTo(integerValue - 1) };
      }
      case useStepper.actionTypes.coerce: {
        if (Number.isNaN(integerValue)) {
          return { value: String(defaultValue) };
        }
        const newValue = validValueClosestTo(integerValue);
        if (newValue !== state.value) {
          return { value: newValue };
        }
        return state;
      }
      default:
        return useStepper.defaultReducer(state, action);
    }
  }

  const mint = async () => {
    try {
      if (!instance) throw new Error(`No Ethereum Instance.`);

      if (!account)
        throw new Error(`No account selected. Try reauthenticating`);
      const amount = (0.069 * (count as any)).toFixed(3);
      // const nonceResponse = await fetch(
      //   `/pro-camel-riders/us-central1/getNonce?address=${account}`
      // );
      // const data = await nonceResponse.json();

      // const signature = await web3!.eth.personal.sign(
      //   `I am signing my one-time nonce: ${data.nonce}`,
      //   account,
      //   "" // MetaMask will ignore the password argument here
      // );

      // const verificationResponse = await fetch(
      //   `/pro-camel-riders/us-central1/verifyAddress?address=${account}&signature=${signature}`
      // );
      // const verificationData = await verificationResponse.json();
      const value = web3.utils.toWei(amount, "ether");

      const gas = (count) => {
        switch (true) {
          case Number(count) > 1 && Number(count) <= 3:
            return "250000";
          case Number(count) > 3 && Number(count) <= 6:
            return "450000";
          case Number(count) > 6 && Number(count) <= 9:
            return "600000";
          case Number(count) > 6 && Number(count) <= 9:
            return "600000";
          case Number(count) > 9 && Number(count) <= 12:
            return "750000";
          case Number(count) > 12 && Number(count) <= 15:
            return "850000";
          case Number(count) > 15:
            return "950000";
        }
      };

      /* await instance.methods.mint(count).send({
        from: account,
        value,
        gas: gas(count),
      }); */

      const myvalue = (category) => {
        switch (true) {
          case category == 3:
            return web3.utils.toWei("0.01", "ether");
          case category == 2:
            return web3.utils.toWei("0.05", "ether");
          case category == 1:
            return web3.utils.toWei("0.1", "ether");
        }
      };

      const gasfee = (category) => {
        switch (true) {
          case category == 3:
            return "250000";
          case category == 2:
            return "250000";
          case category == 1:
            return "250000";
        }
      };
      await instance.methods.mint(category).send({
        from: account,
        value: myvalue(category),
        gas: gasfee(category),
      });

      // const gas = await tx.estimateGas({ from: account });
      // const gasPrice = await web3.eth.getGasPrice();
      // const data = tx.encodeABI();
      // const nonce = await web3.eth.getTransactionCount(account);

      // console.log({
      //   gas,
      //   gasPrice,
      //   nonce,
      //   data,
      // });
    } catch (error) {
      console.log(error);
    }
  };

  const connect = async () => {
    try {
      console.log("Connecting", connected);
      // Verify address is in Presales.
      // await
      //Retrieve current nonce.
      // After presales.
      setActivatingConnector(currentConnector);
      activate(connectorsByName["Injected"]);
    } catch (error) {
      console.log(error, "Error");
    }
  };

  const contract = useContext(ContractContext);

  React.useEffect(() => {
    console.log("Contract", contract);


  }, [contract]);

  const { isOpen, onOpen, onClose } = useDisclosure();/////
  const [value, setValue] = React.useState('0');/////

  const [propindex, setPropindex] = React.useState(0);
  const [proptitle, setProptitle] = React.useState("");
  const [propcontent, setPropcontent] = React.useState("");
  const [options, setOptions] = React.useState(["I don't care.", "Yes, I agree.", "No, I don't agree."]);
  // const [propoption2, setPropoption2] = React.useState("");
  // const [propoption3, setPropoption3] = React.useState("");
  const [propopened, setPropopened] = React.useState(true);

  const addOption = () => {
    setOptions(options => [...options, ""]);

  }

  const openProposal = async () => {
    try {

      /* struct ProposalData {
        uint256 index;
        string title;
        string content;
        string[] options;
        address[] voters;
        uint256[] weights;
        bool opened;
    } */

      /////////////////////////////////


      if (!instance) throw new Error(`No Proposal Instance.`);

      if (!account)
        throw new Error(`No account selected. Try reauthenticating`);

      /* const gasfee = "1050000";  */
      
      await instance.methods.openProposalPublic(
        proptitle,
        propcontent,
        options,
        propopened
      ).send({ from: account, gas: 1050000 })



      let proposals = await instance.methods.viewProposals().call();

      /* console.log(proposals) */

      if (proposals && proposals.length > 0) {
        setProposalData(proposals);
      }


    } catch (error) {
      console.log(error);
    }
  };



  const onVoteConfirm = async (value, index) => {
    try {

      if (!instance) throw new Error(`No Proposal Instance.`);

      if (!account)
        throw new Error(`No account selected. Try reauthenticating`);
      console.log(index, value);
      await instance.methods.vote(
        index,
        value
      ).send({ from: account, gas: 1050000 })

      let proposals = await instance.methods.viewProposals().call();

      if (proposals && proposals.length > 0) {
        setProposalData(proposals);
      }

    } catch (error) {
      console.log(error);
    }
  };


  const closeProposal = async (index) => {
    try {
      console.log(index);
      if (!instance) throw new Error(`No Proposal Instance.`);
      if (!account)
        throw new Error(`No account selected. Try reauthenticating`);
        
      await instance.methods.closeProposal(
        index
      ).send({ from: account, gas: 1050000 });
      let proposals = await instance.methods.viewProposals().call();
      if (proposals && proposals.length > 0) {
        setProposalData(proposals);
      }
      let newVotingResult = await instance.methods.calc_result(
        index
      ).call();
      setVotingResults(votingResult => [...votingResult, {proposalID: index, result: newVotingResult}])
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <Flex width="100%" mt={10} justifyContent="center" alignItems="center">
      <Stack width="100%" align="center">
        <Stack
          width={{ base: "100%", md: "120%" }}
          direction={{ base: "column", md: "column" }}
          textAlign="center"
          align="center"
        >
          <section id="roadmap2" className="relative">
            <div id="featureblocks_flex" className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none">
              <div className="featureblocks_container" >
                <div className="featureblocks_buttoncontainer">
                  <a className="featureblocks_button1 " href="#0"  >Learn more ...</a>
                </div>
                <img className="featureblocks_nft" src={Nft1} width="400" height="400" alt="Hero" />
                <h4 className="featureblocks_button">NFT #1 : $500</h4>

                <div className="featureblocks_mintsupply">
                  <p id="bronze_state" className="nft_state">0/50</p>
                </div>

                <div className="select_btn" id="select_bronze" onClick={selectBronze}>
                  Select
                </div>

                <div id="bronze_mint" className="mint_hide">
                  {!connected && (
                    <Button
                      size={"lg"}
                      fontWeight={"normal"}
                      borderRadius="20px"
                      fontSize="16px"
                      background="white"
                      color="blue"
                      // disabled={disabled}
                      onClick={connect}
                      border="blue solid 1px"
                    >
                      Connect Wallet
                    </Button>
                  )}
                  {active && (
                    <Button
                      size={"lg"}
                      fontWeight={"normal"}
                      borderRadius="20px"
                      fontSize="16px"
                      background="white"
                      color="blue"
                      onClick={mint}
                      border="blue solid 1px"
                    >
                      Mint Selected NFT
                    </Button>
                  )}
                </div>

              </div>
              <div className="featureblocks_container">
                <div className="featureblocks_buttoncontainer">
                  <a className="featureblocks_button1 " href="#0"  >Learn more ...</a>
                </div>
                <img className="featureblocks_nft" src={Nft2} width="400" height="400" alt="Hero" />
                <h4 className="featureblocks_button">NFT #2 : $1000</h4>

                <div className="featureblocks_mintsupply">
                  <p id="silver_state" className="nft_state">0/50</p>
                </div>

                <div id="silver_NFT_mint" className="featureblocks_mintbtn">

                  <div className="select_btn" id="select_silver" onClick={selectSilver}>
                    Select
                  </div>

                  <div id="silver_mint" className="mint_hide">
                    {!connected && (
                      <Button
                        size={"lg"}
                        fontWeight={"normal"}
                        borderRadius="20px"
                        fontSize="16px"
                        background="white"
                        color="blue"
                        // disabled={disabled}
                        onClick={connect}
                        border="blue solid 1px"
                      >
                        Connect Wallet
                      </Button>
                    )}
                    {active && (
                      <Button
                        size={"lg"}
                        fontWeight={"normal"}
                        borderRadius="20px"
                        fontSize="16px"
                        background="white"
                        color="blue"
                        onClick={mint}
                        border="blue solid 1px"
                      >
                        Mint Selected NFT
                      </Button>
                    )}
                  </div>

                </div>
              </div>
              <div className="featureblocks_container">
                <div className="featureblocks_buttoncontainer">
                  <a className="featureblocks_button1 " href="#0"  >Learn more ...</a>
                </div>
                <img className="featureblocks_nft" src={Nft3} width="400" height="400" alt="Hero" />
                <h4 className="featureblocks_button">NFT #3 : $5000</h4>

                <div className="featureblocks_mintsupply">
                  <p id="gold_state" className="nft_state">1/11</p>
                </div>

                <div id="gold_NFT_mint" className="featureblocks_mintbtn">

                  <div className="select_btn" id="select_gold" onClick={selectGold}>
                    Select
                  </div>


                  <div id="gold_mint" className="mint_hide">
                    {!connected && (
                      <Button
                        size={"lg"}
                        fontWeight={"normal"}
                        borderRadius="20px"
                        fontSize="16px"
                        background="white"
                        color="blue"
                        // disabled={disabled}
                        onClick={connect}
                        border="blue solid 1px"
                      >
                        Connect Wallet
                      </Button>
                    )}
                    {active && (
                      <Button
                        size={"lg"}
                        fontWeight={"normal"}
                        borderRadius="20px"
                        fontSize="16px"
                        background="white"
                        color="blue"
                        onClick={mint}
                        border="blue solid 1px"
                      >
                        Mint Selected NFT
                      </Button>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </section>
          <section >
            <Tabs>
              <TabList>
                <Tab>All Proposals</Tab>
                <Tab>Create New Proposal</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>

                  {
                    proposalData.map(
                      (proposalItem, index) => {
                        let votingResult = votingResults.filter(v=> v.proposalID == proposalItem.index);
                        console.log(votingResults);
                        return <Proposal
                          onVoteConfirm={(value)=> {onVoteConfirm(value, index)}}
                          key={index}
                          proposalItem={proposalItem}
                          votingResult={votingResult}
                          closeProposal={closeProposal}
                        />
                      }
                    )
                  }

                </TabPanel>
                <TabPanel>
                  <Box borderWidth={"1px"} padding={"20px"} marginTop={"10px"} borderRadius={"10px"} width={"1000px"} borderColor={"black"}>
                    <Text fontSize='xl' textAlign={"left"} marginTop={"30px"}>Title</Text>
                    <Input placeholder='Invest to new item.'

                      onChange={(event) => { setProptitle(event.target.value) }}
                    />
                    <Text fontSize='xl' textAlign={"left"} marginTop={"30px"} >Content</Text>
                    <Textarea placeholder='There is new item in market.'
                      onChange={(event) => { setPropcontent(event.target.value) }}
                    />
                    <Flex marginTop={"30px"}>
                      <Text fontSize='xl'>Options</Text>
                      <Spacer />
                      <IconButton id="currentlyDisplayNone" aria-label='Search database' icon={<AddIcon />} onClick={(e) => { addOption() }} />
                    </Flex>
                    <OrderedList>
                      {
                        options.map((option, index) => {
                          return <ListItem marginTop={"10px"}>
                            <OptionEditItem 
                              optiontext={option}
                              id={index}
                              updateOptionText={(id, value) => {
                                let newOptions = [...options];
                                newOptions[id] = value;
                                setOptions(newOptions);
                              }}
                              removeOption={(id) => {
                                setOptions(options.filter((option, sub_index) => id !== sub_index));
                              }}
                            />
                          </ListItem>
                        })
                      }
                    </OrderedList>
                    <Divider marginTop={"30px"} />
                    <Flex marginTop={"30px"}>
                      <Button colorScheme='blue' onClick={openProposal}>Open Proposal</Button>
                      <Spacer />
                      {/* <Button colorScheme='blue'>Clear</Button> */}
                    </Flex>
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </section>

          {/* <NumberInput
            variant="outline"
            placeholder="Amount"
            defaultValue={1}
            min={min}
            max={max}
            onChange={(e) => setCount(Number(e))}
            size="lg"
            background="blue"
            color="white"
          >
            <NumberInputField readOnly textAlign="center" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput> */}



          {/* <Box height="200px" background="red" width="200px">
            {JSON.stringify(hidden)}: Here
            {JSON.stringify(authUser)}: user
            {JSON.stringify(loading)}: user
            {JSON.stringify(account)}: account
            {JSON.stringify(accounts)}: accounts
          </Box> */}
        </Stack>
      </Stack>
    </Flex>
  );
}

var category = 0;

function selectBronze() {
  var x = document.getElementById("select_bronze");
  if (x.innerHTML == 'Unselect') {
    x.innerHTML = 'Select';

    var a = document.getElementById("select_gold");
    var b = document.getElementById("select_silver");
    a.className = "select_btn";
    b.className = "select_btn";

    var c = document.getElementById("bronze_mint");
    c.className = "mint_hide";

    category = 0;
  } else {
    x.innerHTML = 'Unselect';

    var a = document.getElementById("select_gold");
    var b = document.getElementById("select_silver");
    a.className += "_hide";
    b.className += "_hide";

    var c = document.getElementById("bronze_mint");
    c.className += "_show";

    category = 3;
  }
}

function selectSilver() {
  var x = document.getElementById("select_silver");
  if (x.innerHTML === 'Unselect') {
    x.innerHTML = 'Select';

    var a = document.getElementById("select_gold");
    var b = document.getElementById("select_bronze");
    a.className = "select_btn";
    b.className = "select_btn";

    var c = document.getElementById("silver_mint");
    c.className = "mint_hide";

    category = 0;

  } else {
    x.innerHTML = 'Unselect';

    var a = document.getElementById("select_gold");
    var b = document.getElementById("select_bronze");
    a.className += "_hide";
    b.className += "_hide";


    var c = document.getElementById("silver_mint");
    c.className += "_show";

    category = 2;
  }
}

function selectGold() {
  var x = document.getElementById("select_gold");
  if (x.innerHTML == 'Unselect') {
    x.innerHTML = 'Select';

    var a = document.getElementById("select_silver");
    var b = document.getElementById("select_bronze");
    a.className = "select_btn";
    b.className = "select_btn";

    var c = document.getElementById("gold_mint");
    c.className = "mint_hide";

    category = 0;

  } else {
    x.innerHTML = 'Unselect';

    var a = document.getElementById("select_silver");
    var b = document.getElementById("select_bronze");
    a.className += "_hide";
    b.className += "_hide";

    var c = document.getElementById("gold_mint");
    c.className += "_show";

    category = 1;
  }
}


export default MintComponent;
