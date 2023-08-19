const useTransaction = (item) => {
  const handleCalculateProductPrice = () => {
    let total = 0;

    let optionPrice = 0;

    for (let i = 0; i < item.options.length; i += 1) {
      optionPrice += item.options[i].price;
    }

    total =
      (parseFloat((item.price / item.lotSize).toFixed(2)) + item.variantPrice + optionPrice) *
      item.qty;

    return total;
  };

  return {
    price: handleCalculateProductPrice(),
  };
};

export default useTransaction;
