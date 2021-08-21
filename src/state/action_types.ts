import { ActionMyWalletAddress } from "modules/update_my_wallet_address";
import { ActionUpdateComments } from "modules/update_comments";
import { ActionValidAccount } from "modules/update_valid_account";

export type ActionType = ActionMyWalletAddress | ActionValidAccount | ActionUpdateComments;
