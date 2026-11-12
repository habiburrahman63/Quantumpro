import test from 'node:test';
import assert from 'node:assert/strict';
import { formatHeight, matchProfile, SearchFilterState } from './filterUtils';

test('formatHeight formats inches to feet and inches correctly', () => {
  assert.equal(formatHeight(60), `5'0"`);
  assert.equal(formatHeight(72), `6'0"`);
  assert.equal(formatHeight(65), `5'5"`);
});

test('matchProfile filters accurately based on criteria', () => {
  const profile = {
    isPremium: true,
    maritalStatus: 'Single' as const,
    heightInches: 66,
    age: 28,
    religion: 'Islam',
    nationality: 'American',
    residingIn: 'United States',
  };

  const defaultFilter: SearchFilterState = {
    premiumOnly: 'Any',
    maritalStatus: 'Single',
    heightMin: 60,
    heightMax: 72,
    ageMin: 25,
    ageMax: 38,
    religion: '',
    nationality: '',
    residingIn: '',
  };

  assert.equal(matchProfile(profile, defaultFilter), true);

  const filterNonMatch: SearchFilterState = {
    ...defaultFilter,
    ageMin: 30,
  };
  assert.equal(matchProfile(profile, filterNonMatch), false);
});
