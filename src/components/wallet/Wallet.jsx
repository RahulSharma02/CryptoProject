import React from 'react';

import { Button, Modal } from 'antd';
import { CheckCircleOutlined, WarningOutlined, warningOutlined } from '@ant-design/icons';

import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";

import { useWeb3React } from '@web3-react/core'

const CoinbaseWallet = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    bridge: "https://bridge.walletconnect.org",
    supportedChainIds: [1, 3, 4, 5, 42],
});

const WalletConnect = new WalletConnectConnector({
    rpcUrl: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
    appName: "Web3-react Demo",
    qrcode: true,
});

const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42]
});

export default function Wallet() {

    const [visible, setVisible] = React.useState(false);
    const { activate, deactivate, active, chainId, account } = useWeb3React();

    React.useEffect(() => {
        if (active) setVisible(false)
    }, [active])


    const showModal = () => {
        setVisible(true);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', }}>
            <div>
                <p>Wallet Integration with Web3</p>

                <div>Connection Status: {active ?
                    <CheckCircleOutlined style={{ fontSize: '16px', color: 'green' }} /> :
                    <>  <WarningOutlined style={{ fontSize: '16px', color: 'orange' }} />
                        Not connected</>}</div>

                <div>{`Account: ${account ? account : "Not connected"}`}</div>
                {chainId && <div>{`Network ID: ${chainId}`}</div>}

                {!active ? <Button onClick={showModal}>Connect Wallet</Button> : <Button onClick={deactivate}>Disconnect</Button>}

                <Modal
                    title="Connect Wallet"
                    visible={visible}
                    // confirmLoading={confirmLoading}
                    onCancel={() => {
                        setVisible(false)
                    }}
                >
                    <Button onClick={() => { activate(CoinbaseWallet) }}>Coinbase Wallet</Button>
                    <Button onClick={() => { activate(WalletConnect) }}>Wallet Connect</Button>
                    <Button onClick={() => { activate(Injected) }}>Metamask</Button>

                </Modal>
            </div>

        </div >
    )
}
