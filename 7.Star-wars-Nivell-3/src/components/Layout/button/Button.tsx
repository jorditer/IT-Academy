import { ComponentProps } from 'react';
import clsx from 'clsx';
import styles from './button.module.css';
import '../../../styles/index.css';

export type ButtonProps = ComponentProps<'button'> & {
// This imports all the typical props of a button, which means ButtonProps takes everything that a button can take & the varian  t
  variant: 'primary' | 'secondary' | 'destructive' | 'weird'; // Some teams call variant 'appearance' or 'kind' it doesn't matter
  size: 'small' | 'medium' | 'large';
};



const Button = ({ variant, size, className, ...props }: ButtonProps) => {
	let classes = clsx(
		styles.button,
		styles[variant],
		styles[size],
		className,
	)
	return <button {...props} className={classes} />
}

export default Button;