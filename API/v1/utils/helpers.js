const Utility = {
  stripNull(obj) {
    let cleanObj = {};

    Object.keys(obj).forEach((val) => {
      const newVal = obj[val];
      cleanObj = newVal ? { ...cleanObj, [val]: newVal } : cleanObj;
    });

    return cleanObj;
  },

  isOrderTime() {
    const now = new Date();
    const currentTime = now.getHours();
    const openTime = 9; // We open for order by 9:00am
    const closeTime = 18; // We close for the day by 6:00pm
    return currentTime >= openTime && closeTime <= 18;
  },
};

export default Utility;
