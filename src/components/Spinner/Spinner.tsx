import spinner from '../../assets/spinner.svg';
import Image from 'next/image';

export default function Spinner() {
  return <Image src={spinner} alt="spinner loading" data-testid="spinner"></Image>;
}
