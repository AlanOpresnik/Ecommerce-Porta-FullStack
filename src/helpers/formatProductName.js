const formatProductName = (name ) => {
    const formattedProductName = name.replace(/[/\s]/g, "-");
    return formattedProductName;
  };
  
  export default formatProductName;