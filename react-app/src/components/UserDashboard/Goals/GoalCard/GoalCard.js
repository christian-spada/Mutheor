import { formatDate, logger } from '../../../../utils/helpers';
import OpenModalButton from '../../../OpenModalButton';
import DeleteGoalModal from '../DeleteGoalModal/DeleteGoalModal';
import EditGoalModal from '../EditGoalModal/EditGoalModal';
import './GoalCard.css';

const GoalCard = ({ goal, user }) => {
  return (
    <div className="goal-card card">
      <header className="goal-card__header">
        <OpenModalButton
          modalComponent={
            <EditGoalModal
              goalToEdit={goal}
              user={user}
            />
          }
          icon={<i className="fa-regular fa-pen-to-square"></i>}
        />

        <OpenModalButton
          modalComponent={
            <DeleteGoalModal
              goalToDelete={goal}
              user={user}
            />
          }
          icon={<i className="fa-solid fa-xmark"></i>}
        />
      </header>
      <section className="goal-card__info-section">
        <div>
          <i className="fa-solid fa-sliders"></i>
          <span>
            {goal.instrument.type}{' '}
            {goal.instrument.nickname !== 'Needs nickname!' ? goal.instrument.nickname : ''}
          </span>
        </div>
        <div>
          <i className="fa-regular fa-calendar"></i>
          <time>{formatDate(goal.targetDate, '-')}</time>
        </div>
      </section>

      {/* TODO - MAKE DAYS REMAINING FOR GOAL DYNAMIC. IT IS CURRENTLY HARD CODED */}
      <section className="goal-card__days-remaining-section">
        <p className="goal-card__days-remaining">25 days remaining</p>
      </section>

      <section className="goal-card__description-section">
        <p className="goal-card__description">{goal.description}</p>
      </section>
    </div>
  );
};

export default GoalCard;
