const verbs = '(pat|wade|ollie|will|rob|buck|bob|mark|jack)'

let list = [
  // ==== Tense ====
  //he left
  { match: '#Noun #Adverb? [left]', group: 0, tag: 'PastTense', reason: 'left-verb' },
  //this rocks
  { match: '(this|that) [#Plural]', group: 0, tag: 'PresentTense', reason: 'this-verbs' },

  // ==== Auxiliary ====
  //was walking
  { match: `[#Copula (#Adverb|not)+?] (#Gerund|#PastTense)`, group: 0, tag: 'Auxiliary', reason: 'copula-walking' },
  //support a splattering of auxillaries before a verb
  { match: `[(has|had) (#Adverb|not)+?] #PastTense`, group: 0, tag: 'Auxiliary', reason: 'had-walked' },
  //would walk
  { match: `[(#Modal|did) (#Adverb|not)+?] #Verb`, group: 0, tag: 'Auxiliary', reason: 'modal-verb' },
  //would have had
  {
    match: `[#Modal (#Adverb|not)+? have (#Adverb|not)+? had (#Adverb|not)+?] #Verb`,
    group: 0,
    tag: 'Auxiliary',
    reason: 'would-have',
  },
  //would be walking
  { match: `#Modal (#Adverb|not)+? be (#Adverb|not)+? #Verb`, group: 0, tag: 'Auxiliary', reason: 'would-be' },
  //had been walking
  {
    match: `(#Modal|had|has) (#Adverb|not)+? been (#Adverb|not)+? #Verb`,
    group: 0,
    tag: 'Auxiliary',
    reason: 'had-been',
  },
  //was walking
  { match: `[#Copula (#Adverb|not)+?] (#Gerund|#PastTense)`, group: 0, tag: 'Auxiliary', reason: 'copula-walking' },
  //support a splattering of auxillaries before a verb
  { match: `[(has|had) (#Adverb|not)+?] #PastTense`, group: 0, tag: 'Auxiliary', reason: 'had-walked' },
  //would walk
  { match: `[(#Modal|did) (#Adverb|not)+?] #Verb`, group: 0, tag: 'Auxiliary', reason: 'modal-verb' },
  // will walk
  { match: '[(do|does|will|have|had)] (not|#Adverb)? #Verb', group: 0, tag: 'Auxiliary', reason: 'have-had' },
  // about to go
  { match: '[about to] #Adverb? #Verb', group: 0, tag: ['Auxiliary', 'Verb'], reason: 'about-to' },
  //would be walking
  { match: `#Modal (#Adverb|not)+? be (#Adverb|not)+? #Verb`, group: 0, tag: 'Auxiliary', reason: 'would-be' },
  //would have had
  {
    match: `[#Modal (#Adverb|not)+? have (#Adverb|not)+? had (#Adverb|not)+?] #Verb`,
    group: 0,
    tag: 'Auxiliary',
    reason: 'would-have',
  },
  //had been walking
  {
    match: `(#Modal|had|has) (#Adverb|not)+? been (#Adverb|not)+? #Verb`,
    group: 0,
    tag: 'Auxiliary',
    reason: 'had-been',
  },

  // was being driven
  { match: '[being] #Participle', group: 0, tag: 'Auxiliary', reason: 'being-foo' },

  // ==== Phrasal ====
  //'foo-up'
  { match: '(#Verb && @hasHyphen) up', group: 0, tag: 'PhrasalVerb', reason: 'foo-up' },
  { match: '(#Verb && @hasHyphen) off', group: 0, tag: 'PhrasalVerb', reason: 'foo-off' },
  { match: '(#Verb && @hasHyphen) over', group: 0, tag: 'PhrasalVerb', reason: 'foo-over' },
  { match: '(#Verb && @hasHyphen) out', group: 0, tag: 'PhrasalVerb', reason: 'foo-out' },
  //fall over
  { match: '#PhrasalVerb [#PhrasalVerb]', group: 0, tag: 'Particle', reason: 'phrasal-particle' },

  // ==== Copula ====
  //will be running (not copula)
  { match: '[will #Adverb? not? #Adverb? be] #Gerund', group: 0, tag: 'Copula', reason: 'will-be-copula' },
  //for more complex forms, just tag 'be'
  { match: 'will #Adverb? not? #Adverb? [be] #Adjective', group: 0, tag: 'Copula', reason: 'be-copula' },

  // ==== Infinitive ====
  //march to
  { match: '[march] (up|down|back|to|toward)', group: 0, tag: 'Infinitive', reason: 'march-to' },
  //must march
  { match: '#Modal [march]', group: 0, tag: 'Infinitive', reason: 'must-march' },
  //let him glue
  {
    match: '(let|make|made) (him|her|it|#Person|#Place|#Organization)+ [#Singular] (a|an|the|it)',
    group: 0,
    tag: 'Infinitive',
    reason: 'let-him-glue',
  },

  //he quickly foo
  { match: '#Noun #Adverb [#Noun]', group: 0, tag: 'Verb', reason: 'quickly-foo' },
  //will secure our
  { match: 'will [#Adjective]', group: 0, tag: 'Verb', reason: 'will-adj' },
  //he disguised the thing
  { match: '#Pronoun [#Adjective] #Determiner #Adjective? #Noun', group: 0, tag: 'Verb', reason: 'he-adj-the' },

  //is eager to go
  { match: '#Copula [#Adjective to] #Verb', group: 0, tag: 'Verb', reason: 'adj-to' },

  // would wade
  { match: `#Modal [${verbs}]`, group: 0, tag: 'Verb', reason: 'would-mark' },
  { match: `#Adverb [${verbs}]`, group: 0, tag: 'Verb', reason: 'really-mark' },
  // wade smith
  { match: `${verbs} #Person`, tag: 'Person', reason: 'rob-smith' },
  // wade m. Cooper
  { match: `${verbs} #Acronym? #ProperNoun`, tag: 'Person', reason: 'rob-a-smith' },

  // damn them
  { match: '[shit] (#Determiner|#Possessive|them)', group: 0, tag: 'Verb', reason: 'swear1-verb' },
  { match: '[damn] (#Determiner|#Possessive|them)', group: 0, tag: 'Verb', reason: 'swear2-verb' },
  { match: '[fuck] (#Determiner|#Possessive|them)', group: 0, tag: 'Verb', reason: 'swear3-verb' },
]

module.exports = list
