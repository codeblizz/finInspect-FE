export const countrySelectStyle = {
  control: (base: any, state: { isFocused: any, isSelected: any }) => ({
    ...base,
    height: 35,
    minHeight: 35,
    width: '150px',
    minWidth: '150px',
    marginTop: '20px',
    borderRadius: 7,
    borderWidth: '0.5px',
    fontSize: '12px',
    backgroundColor: state.isSelected ? 'green' : 'white',
    // background: 'bg-slate-200',
    // borderColor: state.isFocused ? '#9e9e9e' : '#bdbdbd',
    // boxShadow: state.isFocused ? 1 : 1,
    // '&:hover': {
    //   borderColor: state.isFocused ? '#9e9e9e' : '#BDBDBD',
    // },
  }),
  option: (
    styles: { [x: string]: any },
    { data, isDisabled, isFocused, isSelected }: any
  ) => {
    const color = '#65983833';
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? '#65983833'
        : isFocused
        ? color
        : undefined,
      color: isDisabled ? '#ccc' : isSelected ? '#022c1b' : 'black',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      fontSize: '12px',
      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? '#022c1b'
            : '#65983833'
          : undefined,
      },
    };
  },
  valueContainer: (base: any) => ({
    ...base,
    overflow: 'unset',
  }),
  placeholder: (base: any) => ({
    ...base,
    fontSize: '1em',
    color: '#9da5b1',
    fontWeight: 400,
    display: 'flex',
  }),
  input: (base: any) => ({
    ...base,
    position: 'absolute',
    color: '#9da5b1',
  }),
};
