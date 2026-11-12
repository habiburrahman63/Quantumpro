/**
 * Path to Marriage Filter and Search Logic
 */

export interface SearchFilterState {
  premiumOnly: 'Any' | 'Premium Only';
  maritalStatus: 'Any' | 'Single' | 'Divorced' | 'Widowed';
  heightMin: number; // inches, e.g. 60 = 5'0"
  heightMax: number; // inches, e.g. 72 = 6'0"
  ageMin: number;
  ageMax: number;
  religion: string;
  nationality: string;
  residingIn: string;
}

export function formatHeight(inches: number): string {
  const feet = Math.floor(inches / 12);
  const remInches = inches % 12;
  return `${feet}'${remInches}"`;
}

export function matchProfile(
  profile: {
    isPremium: boolean;
    maritalStatus: 'Single' | 'Divorced' | 'Widowed';
    heightInches: number;
    age: number;
    religion: string;
    nationality: string;
    residingIn: string;
  },
  filters: SearchFilterState
): boolean {
  if (filters.premiumOnly === 'Premium Only' && !profile.isPremium) {
    return false;
  }
  if (filters.maritalStatus !== 'Any' && profile.maritalStatus !== filters.maritalStatus) {
    return false;
  }
  if (profile.heightInches < filters.heightMin || profile.heightInches > filters.heightMax) {
    return false;
  }
  if (profile.age < filters.ageMin || profile.age > filters.ageMax) {
    return false;
  }
  if (filters.religion && profile.religion.toLowerCase() !== filters.religion.toLowerCase()) {
    return false;
  }
  if (filters.nationality && profile.nationality.toLowerCase() !== filters.nationality.toLowerCase()) {
    return false;
  }
  if (filters.residingIn && profile.residingIn.toLowerCase() !== filters.residingIn.toLowerCase()) {
    return false;
  }
  return true;
}
