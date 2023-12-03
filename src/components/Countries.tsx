import { useAppSelector } from '../store/store';

const CountriesAutoComplete = () => {
  const countries = useAppSelector((store) => store.countries);

  return (
    <datalist id="countries">
      {countries.map((el, i) => {
        return <option key={i} value={el} />;
      })}
    </datalist>
  );
};
export default CountriesAutoComplete;
