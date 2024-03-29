import { useEffect, useState } from 'react';
import { formatDateToValidInputValue } from '../../../../utils/helpers';
import { thunkEditGoal } from '../../../../store/goals';
import { useDispatch } from 'react-redux';
import { useModal } from '../../../../context/Modal';
import { ErrorView } from '../../../UtilComponents/ErrorView';
import './EditGoalModal.css';
import { thunkEditUserGoal } from '../../../../store/session';

export const EditGoalModal = ({ goalToEdit, user }) => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const instruments = user.instruments;
  const currentDate = formatDateToValidInputValue();

  const [instrumentId, setInstrumentId] = useState();
  const [targetDate, setTargetDate] = useState(
    formatDateToValidInputValue(goalToEdit.targetDate)
  );
  const [description, setDescription] = useState(goalToEdit.description);
  const [instrumentType, setInstrumentType] = useState(goalToEdit.instrument.type);
  const [errors, setErrors] = useState({});

  const userInstruments = new Set();

  const multipleSameTypeInstruments = instruments.filter(inst => {
    return inst.type === instrumentType;
  });

  useEffect(() => {
    if (description.length === 255)
      setErrors({ description: 'You have reached the max character limit' });
    else setErrors({});
  }, [description]);

  useEffect(() => {
    const currentInstrument = multipleSameTypeInstruments.find(
      inst => inst.type === instrumentType
    );

    setInstrumentId(currentInstrument.id);
  }, [instrumentType]);

  const handleSubmit = async e => {
    e.preventDefault();

    const updatedGoal = {
      id: goalToEdit.id,
      instrument_id: instrumentId,
      target_date: targetDate,
      description,
    };

    const res = await dispatch(thunkEditGoal(user.id, updatedGoal));

    if (res.errors) {
      setErrors(res.errors);
    } else {
      dispatch(thunkEditUserGoal(res));
      closeModal();
    }
  };

  return (
    <div className="edit-goal-modal">
      <form
        className="edit-goal-form"
        onSubmit={handleSubmit}
      >
        {/* ===== INSTRUMENT TYPE SECTION ===== */}
        <section className="edit-goal-form__type-section">
          <div>
            <label htmlFor="edit-goal-instrument-type">Instrument Type</label>
            <select
              value={instrumentType}
              onChange={e => setInstrumentType(e.target.value)}
              id="edit-goal-instrument-type"
            >
              {instruments.map(inst => {
                if (userInstruments.has(inst.type)) return null;
                userInstruments.add(inst.type);
                return (
                  <option
                    key={inst.id}
                    value={inst.type}
                  >
                    {inst.type}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            {errors.target_date ? (
              <ErrorView error={errors.target_date} />
            ) : (
              <label htmlFor="edit-goal-target-date">Target Date</label>
            )}
            <input
              id="edit-goal-target-date"
              type="date"
              value={targetDate}
              onChange={e => setTargetDate(e.target.value)}
              min={currentDate}
              className={`edit-goal-form__date-input ${
                errors.target_date ? 'error-outline' : ''
              }`}
            />
          </div>
        </section>

        {/* ===== OPTIONAL INSTRUMENT MODEL SECTION ===== */}
        {multipleSameTypeInstruments.length > 1 && (
          <section className="edit-goal-form__multiple-same-type-section">
            <label htmlFor="edit-goal-multiple-same-type">
              Which one of your {instrumentType}'s?
            </label>
            <select
              id="edit-goal-multiple-same-type"
              className="edit-goal-form__multiple-same-type"
              onChange={e => setInstrumentId(parseInt(e.target.value))}
            >
              {multipleSameTypeInstruments.map(inst => (
                <option
                  key={inst.id}
                  value={inst.id}
                >
                  {inst.model}
                </option>
              ))}
            </select>
          </section>
        )}

        {/* ===== GOAL DESCRIPTION SECTION ===== */}
        <section className="edit-goal-form__description-section">
          {errors.description && <ErrorView error={errors.description} />}
          <textarea
            className={`edit-goal-form__description ${
              errors.description ? 'error-outline' : ''
            }`}
            placeholder="Describe your goal here..."
            onChange={e => setDescription(e.target.value)}
            value={description}
            maxLength={255}
          ></textarea>
        </section>
        <section className="edit-goal-form__btn-section">
          <button className="edit-goal-form__update-goal-btn">Update Goal</button>
        </section>
      </form>
    </div>
  );
};

export default EditGoalModal;
