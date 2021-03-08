import spinner from '../../img/load.gif';

const Spinner = () => (
    <div>
        <img
            src={spinner}
            style={{width: '50px', margin: 'auto', display: 'block'}}
            alt='Loading...'
        />
    </div>
)

export default Spinner;