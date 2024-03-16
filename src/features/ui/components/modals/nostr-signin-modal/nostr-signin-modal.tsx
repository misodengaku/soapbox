import React, { useState } from 'react';

import AccountStep from './steps/account-step';
import ExtensionStep from './steps/extension-step';
import IdentityStep from './steps/identity-step';
import KeyAddStep from './steps/key-add-step';
import KeyStep from './steps/key-step';
import KeygenStep from './steps/keygen-step';

type Step = 'extension' | 'identity' | 'key' | 'keygen' | 'key-add' | 'account';

interface INostrSigninModal {
  onClose: (type?: string) => void;
}

const NostrSigninModal: React.FC<INostrSigninModal> = ({ onClose }) => {
  const [step, setStep] = useState<Step>(window.nostr ? 'extension' : 'identity');
  const [accountId, setAccountId] = useState<string | undefined>();

  const handleClose = () => onClose('NOSTR_SIGNIN');

  switch (step) {
    case 'extension':
      return <ExtensionStep setStep={setStep} onClose={handleClose} />;
    case 'identity':
      return <IdentityStep setAccountId={setAccountId} setStep={setStep} onClose={handleClose} />;
    case 'key':
      return <KeyStep setStep={setStep} onClose={handleClose} />;
    case 'key-add':
      return <KeyAddStep setAccountId={setAccountId} setStep={setStep} onClose={handleClose} />;
    case 'keygen':
      return <KeygenStep setAccountId={setAccountId} setStep={setStep} onClose={handleClose} />;
    case 'account':
      return <AccountStep accountId={accountId!} setStep={setStep}  onClose={handleClose} />;
    default:
      return null;
  }
};

export default NostrSigninModal;

export type { Step };
