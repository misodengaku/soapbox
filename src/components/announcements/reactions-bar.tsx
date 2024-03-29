import clsx from 'clsx';
import React from 'react';
import { TransitionMotion, spring } from 'react-motion';

import EmojiPickerDropdown from 'soapbox/features/emoji/containers/emoji-picker-dropdown-container';
import { useSettings } from 'soapbox/hooks';

import Reaction from './reaction';

import type { List as ImmutableList, Map as ImmutableMap } from 'immutable';
import type { Emoji, NativeEmoji } from 'soapbox/features/emoji';
import type { AnnouncementReaction } from 'soapbox/types/entities';

interface IReactionsBar {
  announcementId: string;
  reactions: ImmutableList<AnnouncementReaction>;
  emojiMap: ImmutableMap<string, ImmutableMap<string, string>>;
  addReaction: (id: string, name: string) => void;
  removeReaction: (id: string, name: string) => void;
}

const ReactionsBar: React.FC<IReactionsBar> = ({ announcementId, reactions, addReaction, removeReaction, emojiMap }) => {
  const { reduceMotion } = useSettings();

  const handleEmojiPick = (data: Emoji) => {
    addReaction(announcementId, (data as NativeEmoji).native.replace(/:/g, ''));
  };

  const willEnter = () => ({ scale: reduceMotion ? 1 : 0 });

  const willLeave = () => ({ scale: reduceMotion ? 0 : spring(0, { stiffness: 170, damping: 26 }) });

  const visibleReactions = reactions.filter(x => x.count > 0);

  const styles = visibleReactions.map(reaction => ({
    key: reaction.name,
    data: reaction,
    style: { scale: reduceMotion ? 1 : spring(1, { stiffness: 150, damping: 13 }) },
  })).toArray();

  return (
    <TransitionMotion styles={styles} willEnter={willEnter} willLeave={willLeave}>
      {items => (
        <div className={clsx('flex flex-wrap items-center gap-1', { 'reactions-bar--empty': visibleReactions.isEmpty() })}>
          {items.map(({ key, data, style }) => (
            <Reaction
              key={key}
              reaction={data}
              style={{ transform: `scale(${style.scale})`, position: style.scale < 0.5 ? 'absolute' : 'static' }}
              announcementId={announcementId}
              addReaction={addReaction}
              removeReaction={removeReaction}
              emojiMap={emojiMap}
            />
          ))}

          {visibleReactions.size < 8 && <EmojiPickerDropdown onPickEmoji={handleEmojiPick} />}
        </div>
      )}
    </TransitionMotion>
  );
};

export default ReactionsBar;
