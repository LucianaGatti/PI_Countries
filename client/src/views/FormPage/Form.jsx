import style from './Form.module.css';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCountries, postActivity } from '../../redux/actions';




export default function Form() {
    const dispatch = useDispatch();
    const countries = useSelector(state => state.countries)
    const activities = useSelector(state => state.activities);
    const countriesNames = countries.map(country => { return { label: country.name, value: country.id } })
    const navigate = useNavigate();
    console.log(activities)



    useEffect(() => {
        dispatch(getAllCountries());
    }, [dispatch]);

    const [input, setInputData] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countryId: [],
    })

    const [errors, setErrors] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
    })

    //const [file, setFile] = useState();

    const handleInputChange = ((e) => {
        setInputData({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    )

    /* const handleInputChecked = ((e) => {
        if (e.target.checked)
            setInputData({
                ...input,
                season: e.target.value
            })
    }) */

    const handleSelect = ((e) => {
        setInputData({
            ...input,
            countryId: [...input.countryId, e.target.value],
        })
    });

    /* const handleChangeFile = ((e) => {
        setFile(e.target.files[0])
    }) */
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.name && input.difficulty && input.season && input.countryId.length) {
            dispatch(postActivity(input));
            //axios.post("http://localhost:3001/activities", input)
            //     .then(res => alert(res.data))
            //     .catch(err => alert(err))
            dispatch(getAllCountries())
            try {
                await dispatch(getAllCountries()); // espera a que se complete getAllCountries
                setInputData({
                    name: "",
                    difficulty: 0,
                    duration: 0,
                    season: "",
                    countryId: [],
                    image: ''
                });
                navigate('/home');
            } catch (error) {
                console.log(error);
            }
        } else {
            e.preventDefault()
        }
    }
    const handleDelete = ((e, d) => {
        e.preventDefault();
        setInputData({
            ...input,
            countryId: input.countryId.filter((country) => country !== d),
        })
    });
    
    const validate = (input) => {
        let errors = {};

        if (!input.name) {
            errors.name = "You must enter the name of the activity";
        } else if (activities.map(activity => activity.name).some(name => name === input.name)) {
            errors.name = "Activity already exists"
        } else if (!/^[A-z\s]+$/.test(input.name)) {
            errors.name = "Only letters and spaces are allowed" // que solo acepte letras y espacios
        }
        if (!input.difficulty || input.difficulty < 1 || input.difficulty > 5) {
            errors.difficulty = "Must be a number between 1 and 5";
        } else if (! /^[0-9]+$/ .test(input.difficulty)) {
            errors.difficulty = "Must be a number" // que solo acepte numeros
        }
        if (!input.duration) {
            errors.duration = "Must be a number between 1 and 24";
        } else if (!/^[0-9]+$/.test(input.duration)) {
            errors.duration = "Must be a number" // que solo acepte numeros
        }
        if (!input.season) {
            errors.season = "You must add a season of the year";
        }


        return errors;
    }



    return (
        <div className={style.container}>
            <form className={style.form} onSubmit={(e) => handleSubmit(e)}>

                <h2 className={style.title}>Activity</h2>

                                {/* DIV NAME */}

                <div>
                    <label className={style.subtitle}>Name</label>
                    <input
                        type='text'
                        value={input.name}
                        name='name'
                        onChange={(e) => handleInputChange(e)}
                        className={errors.name ? style.errorInputName : style.inputName}
                    />
                    {<p className={style.errorP}>{errors.name ? errors.name : null}</p>}
                </div>
                                {/* DIV DIFFICULTY */}

                <div>
                    <label className={style.subtitle}>Difficulty</label>
                    <input
                        type='number' min='1' max='5' value={input.difficulty} name='difficulty'
                        onChange={(e) => handleInputChange(e)}
                        className={errors.difficulty ? style.errorInputDifficulty : style.inputDifficulty}
                    />
                    {<p className={style.errorP}>{errors.difficulty ? errors.difficulty : null}</p>}
                </div>

                                {/* DIV DURATION */}

                <div>
                    <label className={style.subtitle}>Duration</label>
                    <input
                        type='number'
                        value={input.duration}
                        name='duration'
                        onChange={(e) => handleInputChange(e)}
                        className={errors.duration ? style.errorInputDuration : style.inputDuration}
                    />
                    {<p className={style.errorP}>{errors.duration ? errors.duration : null}</p>}
                </div>
                                {/* DIV SEASON */}
                <div>
                <label className={style.subtitle}>Season</label>
                    <div>
                        <input className={style.inputSeason} type="radio" id='spring' name='season' value='spring' onChange={(e) => handleInputChange(e)} />
                        <label className={style.labelSpring} htmlFor='spring'>Spring</label>
                    </div>

                    <div className={style.sumerInput}>
                        <input className={style.inputSeason} type="radio" id='summer' name='season' value='summer' onChange={(e) => handleInputChange(e)} />
                        <label className={style.labelSummer} htmlFor='summer'> Summer</label>
                    </div>

                    <div className={style.fallInput}>
                        <input className={style.inputSeason} type="radio" id='fall' name='season' value='fall' onChange={(e) => handleInputChange(e)} />
                        <label className={style.labelFall} htmlFor='fall'>Fall</label>
                    </div>

                    <div className={style.winterInput}>
                        <input className={style.inputSeason} type="radio" id='winter' name='season' value='winter' onChange={(e) => handleInputChange(e)} />
                        <label className={style.labelWinter} htmlFor='winter'>Winter</label>
                    </div>

                    {<p className={style.errorP}>{errors.season ? errors.season : null}</p>}
                </div>

                                    {/* DIV CHOOSE A COUNTRY */}

                <div>
                    <select className={style.divChooseCountry} value='countryId' onChange={(e) => handleSelect(e)}>
                        <option selected>Choose a Country</option>
                        {countriesNames.sort((a, b) => a.label.localeCompare(b.label)).map(country => {
                            return <option key={country.value} value={country.value}>{country.label}</option>
                        })}
                    </select>

                </div>
                <div className={style.divCountry}>
                    {input.countryId.filter((c, index, arr) => arr.indexOf(c) === index).map((c, index) => ( //filtro y hago un indexOf para que solo pueda coincidir 1 vez con el país que busco
                        <div key={index}>
                            <button className={style.idsCountry} onClick={(e) => handleDelete(e, c)}>{c} X</button>
                        </div>
                    ))}

                </div>
                                        {/* DIV CREATE ACTIVITY */}
                    <div className={style.submit}>
                {Object.keys(errors).length ?
                    <button className={style.btnNoSubmit} type='submit' disabled>Create Activity</button> :
                    <button className={style.btnSubmit} type='submit'> Create Activity</button>}
                    </div>
                
            </form>
        </div>)
}