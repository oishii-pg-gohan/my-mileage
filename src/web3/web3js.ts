import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { abis } from 'abi/abi';
import { AppContextType } from 'state/context';
import { Comment } from 'modules/update_comments';

// Ethereum上に登録したコントラクトのアドレス
const contractAddress: string = '0xaf49998f12CC2Fb1D710B86bB3632Ae090f32158';

/*
 * ここでcontext持つのはたぶん良くない。
 * react component周りで管理するべきだけど、今回はsampleアプリなのでこのまま。
 */
let context: AppContextType;

// web3オブジェクト。Ethereumとのインターフェースはこいつにお任せ
let web3js: Web3;
let contract: Contract;

/**
 * web3オブジェクトの初期処理
 * 
 * @param _context 本アプリのstateのcontext。※react component内でuseContext()で取得したものを無理矢理渡している
 */
export function init(_context: AppContextType): void {
    context = _context;

    /**
     * Ethereumと通信するプロぱいだーを指定。
     * ws、http、MetaMask経由など指定できる。
     * コントラクトとの通信でwsを利用しているようなので、httpだとうまくいかなかった。
     * MetaMask経由は試したけど、ガス代のかかる処理の時には必ずMetaMaskが立ち上がるようになる。
     * パブリックチェーンとかでETHのことをちゃんと考えないといけない場合は
     * MetaMaskを使うべきだけど、プライベートチェーンのアプリ使用時に毎回MetaMaskが立ち上がるのは
     * 冗長か？と思う。
     */
    web3js = new Web3('ws://localhost:8545');

    /**
     * 指定したアドレスのコントラクトオブジェクトを取得。
     * 「abi」はコントラクトのインターフェース的な情報が載っているJSON。（abisはjsonの配列）
     * コントラクト（.solファイル）をcompileした際に得られるabiをそのまま指定している。
     */
    contract = new web3js.eth.Contract(abis, contractAddress);

    // コントラクトで発生するイベントをlisten。
    contract.events.NewComment()
        .on('data', (event: any): void => {
            console.log('NewComment event: ', event);
            fetchComments();
        })
        .on('error', console.error);

    contract.events.UpdatedComment()
        .on('data', (event: any): void => {
            console.log('UpdatedComment event: ', event);
            fetchComments();
        })
        .on('error', console.error);
}

/**
 * コメント一覧を取得。
 */
export function fetchComments(): void {
    interface ResultGetComments {
        comment: string,
        owner: string,
        lovedUsers: string[]
    }

    /**
     * コメント一覧を取得するコントラクトを実行。
     * 一覧取得だけで、ブロックチェーンに書き込むわけではないため、call()を実行。
     * （コントラクト側でpureとかviewで定義されているfunctionを呼び出す際はcall）
     */
    contract.methods.getComments().call((error: any, result: ResultGetComments[]): void => {
        if (!error) {
            const comments: Comment[] = result.map((data: ResultGetComments): Comment => {
                return {
                    msg: data.comment,
                    owner: data.owner,
                    lovedUsers: data.lovedUsers
                }
            });
            context.dispatch({
                type: 'update_comments',
                data: {
                    comments: comments
                },
            });
        } else {
            console.log(error);
        }
    });
}

/**
 * コメント追加。
 * @param comment コメント
 */
export function addComment(comment: string): void {
    /**
     * コメントを追加するコントラクトを実行。
     * 新規コメントをブロックチェーン上に書き込むため、send()を実行。
     * ガス代の指定が必要だけど、今は適当な額を指定している。（プライベートなsampleなので）
     * パブリックチェーンに乗せる際はガス代とか意識しないと破産のもとなので注意。MetaMask使った方が良い。
     */
    contract.methods.addComment(comment).send({
        from: context.state.myWalletAddress,
        gasPrice: '100',
        gas: 200000,
    });
}

/**
 * いいね！する。
 * ※「いいね！」でもいいんだけど、これtokenになると思うので、
 * ちょっとキャッチーな名前の方がいいかなと思って、likeじゃなくてloveの名称を選択。笑
 * @param id コメントのid
 */
export function loveComment(id: number): void {
    // いいね！するコントラクトを実行
    contract.methods.loveComment(id).send({
        from: context.state.myWalletAddress,
        gasPrice: '100',
        gas: 200000,
    });
}

/**
 * Ethereum上に登録されているアカウントか否かを判定。
 * @param address アカウントのアドレス
 */
export function existsAccount(address: string): void {
    /**
     * Ethereum上のアカウント一覧を取得。
     * 一応全アカウント取ってきてくれる。。。けど、
     * パブリックチェーンの時ってえげつない量のアカウントを取得するのかな？
     * document見てもfilterとかはなさそう？
     */
    web3js.eth.getAccounts((error, accounts): void => {
        if (!error) {
            context.dispatch({
                type: 'update_valid_account',
                data: {
                    validAccount: accounts.includes(address)
                }
            });
        } else {
            console.log('error: ', error);
        }
    });
}