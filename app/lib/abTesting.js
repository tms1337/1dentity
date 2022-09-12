const { UPSTART_AB_TEST_PERCENTAGE = "0.1" } = process.env;

const abTestPercentage = parseFloat(UPSTART_AB_TEST_PERCENTAGE);

export const shouldShowFeature = ({ feature, email }) => {
  const hardcodedUsersForFeature = {
    _FEATURE_HW_UPLOAD: ["aismic@student.ius.edu.ba"],
  };

  if (hardcodedUsersForFeature[feature].join("##").indexOf(email) >= 0) {
    return true;
  }

  return false;
};
