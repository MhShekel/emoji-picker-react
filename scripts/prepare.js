const { writeJSONSync } = require('fs-extra');
const _ = require('lodash');
const pretty = require('emoji-datasource/emoji_pretty');

const keys = {
  EMOJI_PROPERTY_NAME: 'n',
  EMOJI_PROPERTY_UNIFIED: 'u',
  EMOJI_PROPERTY_SKIN_VARIATIONS: 'v',
  EMOJI_PROPERTY_GROUP: 'g',
  GROUP_NAME_PEOPLE: 'smileys_people',
  GROUP_NAME_NATURE: 'animals_nature',
  GROUP_NAME_FOOD: 'food_drink',
  GROUP_NAME_TRAVEL: 'travel_places',
  GROUP_NAME_ACTIVITIES: 'activities',
  GROUP_NAME_OBJECTS: 'objects',
  GROUP_NAME_SYMBOLS: 'symbols',
  GROUP_NAME_FLAGS: 'flags',
  GROUP_NAME_RECENTLY_USED: 'recently_used'
};

const groupConversion = {
  [keys.GROUP_NAME_PEOPLE]: keys.GROUP_NAME_PEOPLE,
  smileys_emotion: keys.GROUP_NAME_PEOPLE,
  people_body: keys.GROUP_NAME_PEOPLE,
  animals_nature: keys.GROUP_NAME_NATURE,
  food_drink: keys.GROUP_NAME_FOOD,
  travel_places: keys.GROUP_NAME_TRAVEL,
  activities: keys.GROUP_NAME_ACTIVITIES,
  objects: keys.GROUP_NAME_OBJECTS,
  symbols: keys.GROUP_NAME_SYMBOLS,
  flags: keys.GROUP_NAME_FLAGS,
  component: null,
  skin_tones: null
};

const emojis = _.sortBy(
  JSON.parse(JSON.stringify(pretty).toLowerCase()),
  'sort_order'
);

const cleanEmoji = emoji => {
  emoji.short_names = emoji.short_names || [];
  emoji[keys.EMOJI_PROPERTY_NAME] = [
    ...new Set(
      [emoji.name, ...emoji.short_names, emoji.short_name].filter(Boolean)
    )
  ];
  emoji[keys.EMOJI_PROPERTY_UNIFIED] = emoji.unified;

  if (emoji.skin_variations) {
    emoji[keys.EMOJI_PROPERTY_SKIN_VARIATIONS] = Object.values(
      _.mapValues(emoji.skin_variations, 'unified')
    );
  }

  return _.pick(emoji, [
    keys.EMOJI_PROPERTY_NAME,
    keys.EMOJI_PROPERTY_UNIFIED,
    keys.EMOJI_PROPERTY_SKIN_VARIATIONS
  ]);
};

const { groupedEmojis } = emojis.reduce(
  ({ groupedEmojis }, emoji) => {
    const categoryClean = emoji.category.replace(' & ', '_');
    const category = groupConversion[categoryClean] || categoryClean;

    if (!groupConversion[category]) {
      return {
        groupedEmojis
      };
    }

    groupedEmojis[category] = groupedEmojis[category] || [];

    groupedEmojis[category].push(cleanEmoji(emoji));
    return { groupedEmojis };
  },
  { groupedEmojis: {} }
);

writeJSONSync('./src/data/emojis.json', groupedEmojis, 'utf8');
