import * as React from 'react';

function NavIcon(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
  return (
    <svg
      viewBox='0 0 16 16'
      fill='currentColor'
      height='2em'
      width='2em'
      {...props}
    >
      <path fill='currentColor' d='' />
    </svg>
  );
}

export default NavIcon;
