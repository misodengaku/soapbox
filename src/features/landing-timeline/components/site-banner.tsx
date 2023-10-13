import React from 'react';

import Markup from 'soapbox/components/markup';
import { Stack } from 'soapbox/components/ui';
import { useInstance } from 'soapbox/hooks';
import { getTextDirection } from 'soapbox/utils/rtl';

import { LogoText } from './logo-text';

const SiteBanner: React.FC = () => {
  const instance = useInstance();
  const description = instance.short_description || instance.description;

  return (
    <Stack space={3}>
      <LogoText dir={getTextDirection(instance.title)}>
        {instance.title}
      </LogoText>

      <Markup
        size='lg'
        dangerouslySetInnerHTML={{ __html: description }}
        direction={getTextDirection(description)}
      />
    </Stack>
  );
};

export { SiteBanner };