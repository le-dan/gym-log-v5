import { useEffect } from "react";
import { Exercise } from "../../../util/interfaces";
import SetCard from "./SetCard";

interface ExerciseInformationProps {
	chosenExercise: Exercise | undefined;
	exercises: Exercise[];
	setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

export default function ExerciseInformation({ chosenExercise, exercises, setExercises }: ExerciseInformationProps) {
	const exercise = exercises.find((e) => e.name === (chosenExercise && chosenExercise.name));

	useEffect(() => {
		if (exercise?.setsCompleted === exercise?.sets) {
			setExercises((prevExercises) => {
				return prevExercises.map((exercise) =>
					exercise.name === (chosenExercise && chosenExercise.name)
						? {
								...exercise,
								["done"]: true,
						  }
						: exercise
				);
			});
		}
	}, [exercise?.setsCompleted]);

	const renderSets = () => {
		if (chosenExercise) {
			const setDivs = [];
			for (let i = 1; i <= chosenExercise.sets; i++) {
				setDivs.push(<SetCard key={i} exerciseName={chosenExercise.name} exercises={exercises} setExercises={setExercises} />);
			}
			return (
				<div className="flex flex-col gap-15 min-h-0 h-full" key={chosenExercise.name}>
					<span className="desktop:text-3xl text-2xl font-black min-h-0">
						{exercise && exercise.setsCompleted}/{chosenExercise.sets} Sets:
					</span>
					<div className="flex flex-col gap-3 p-2 min-h-0 overflow-y-auto h-full grow-0 shrink">{setDivs}</div>
				</div>
			);
		}
	};

	return chosenExercise ? (
		<div
			className="h-full w-full py-10 px-20 flex flex-col gap-10 select-none min-h-0 shadow-lg shadow-primary/30 rounded-lg bg-snow-white-dark"
			key={chosenExercise.name}
		>
			<span className="desktop:text-5xl text-4xl text-primary font-bold w-full text-center p-4 rounded-lg bg-snow-white">
				{"Exercise: " + chosenExercise.name}
				<span className="flex text-lg desktop:text-2xl flex-col w-full text-center bg-snow-white">
					<span className="font-semibold">Muscles Worked:</span>(
					{chosenExercise.musclesWorked.reduce((str, muscle) => (str += muscle.toUpperCase() + " "), "").trimEnd()})
				</span>
			</span>
			<div className="h-full w-full p-5 flex gap-20 justify-between">
				<div className="text-2xl md:text-lg min-h-0 grow rounded-lg p-3 bg-snow-white">{renderSets()}</div>
				{/* <div className="text-2xl md:text-lg flex flex-col select-text" hidden={chosenExercise.notes.length === 0}> */}
				<div className="desktop:text-3xl text-2xl flex flex-col select-text grow rounded-lg p-3 bg-snow-white">
					<span className="font-black">Notes:</span>
					{chosenExercise.notes}
				</div>
			</div>
		</div>
	) : (
		<></>
	);
}
