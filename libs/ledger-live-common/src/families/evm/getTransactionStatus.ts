// import BigNumber from "bignumber.js";
// import {
//   NotEnoughGas,
//   FeeNotLoaded,
//   FeeRequired,
//   InvalidAddress,
//   ETHAddressNonEIP,
//   // GasLessThanEstimate,
// } from "@ledgerhq/errors";
// import { Transaction as EvmTransaction } from "./types";
// import { Account } from "../../types";
// import { ethers } from "ethers";

// type ValidatedTransactionFields = "recipient" | "gasLimit" | "gasPrice";
// type ValidationIssues = Partial<Record<ValidatedTransactionFields, Error>>;

// type getTransactionStatusFn = (
//   a: Account,
//   t: EvmTransaction
// ) => Promise<{
//   errors: ValidationIssues;
//   warnings: ValidationIssues;
//   estimatedFees: BigNumber;
//   amount: BigNumber;
//   totalSpent: BigNumber;
// }>;

// const DEFAULT_GAS_LIMIT = new BigNumber(21000);
// const ethAddressRegEx = /^(0x)?[0-9a-fA-F]{40}$/;

// const validateRecipient = (
//   a: Account,
//   t: EvmTransaction
// ): Array<Error | undefined> => {
//   let error;
//   let warning;

//   if (t.recipient) {
//     // Check if recipient is a valid eth address or not
//     if (
//       !ethers.utils.isAddress(t.recipient) ||
//       !t.recipient.match(ethAddressRegEx)
//     ) {
//       error = new InvalidAddress("", {
//         currency: a.currency,
//       });
//     } else {
//       // Check if address is respecting EIP-55
//       try {
//         const recipientChecksumed = ethers.utils.getAddress(t.recipient);
//         if (t.recipient !== recipientChecksumed) {
//           throw new Error();
//         }
//       } catch (e) {
//         warning = new ETHAddressNonEIP();
//       }
//     }
//   }

//   return [error, warning];
// };

// const validateGas = (
//   a: Account,
//   t: EvmTransaction,
//   gasLimit: BigNumber,
//   gasPrice: BigNumber
// ): Array<Error | undefined> => {
//   let error;
//   let warning;

//   if (!t.gasPrice) {
//     errors.gasPrice = new FeeNotLoaded();
//   } else if (gasLimit.eq(0)) {
//     errors.gasLimit = new FeeRequired();
//   } else if (!errors.recipient) {
//     if (estimatedFees.gt(a.balance)) {
//       errors.gasPrice = new NotEnoughGas();
//     }
//   }

//   // if (t.estimatedGasLimit && gasLimit.lt(t.estimatedGasLimit)) {
//   //   warnings.gasLimit = new GasLessThanEstimate();
//   // }

//   return [error, warning];
// };

// export const getTransactionStatus: getTransactionStatusFn = (a, t) => {
//   const gasLimit = t.gasLimit || DEFAULT_GAS_LIMIT;
//   /** @TODO Change for EIP1559 */
//   const estimatedFees = (t.gasPrice || new BigNumber(0)).times(gasLimit);
//   const errors: ValidationIssues = {};
//   const warnings: ValidationIssues = {};

//   const result = {
//     errors,
//     warnings,
//     estimatedFees,
//     amount: new BigNumber(0),
//     totalSpent: new BigNumber(0),
//   };

//   // Recipient related errors and warnings
//   const [recipientErr, recipientWarn] = validateRecipient(a, t);
//   errors.recipient = recipientErr;
//   warnings.recipient = recipientWarn;

//   // Gas related errors and warnings

//   // if (t.estimatedGasLimit && gasLimit.lt(t.estimatedGasLimit)) {
//   //   warnings.gasLimit = new GasLessThanEstimate();
//   // }

//   return Promise.resolve(result);
// };

// export default getTransactionStatus;

export const getTransactionStatus = () => ({} as any);
