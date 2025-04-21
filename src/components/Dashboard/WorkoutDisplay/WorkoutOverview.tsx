import dayjs from "dayjs";
import { Exercise, WorkoutInterface } from "../../../util/interfaces";
import { useMemo } from "react";
import { StopwatchResult } from "react-timer-hook";
import { CircleArrowLeft, CirclePause, CirclePlay } from "lucide-react";
import { useNavigate } from "react-router";
import useMediaQuery from '@mui/material/useMediaQuery';

interface WorkoutOverviewProps {
	currentDay: dayjs.Dayjs;
	workout: WorkoutInterface | undefined;
	exercises: Exercise[];
	stopwatch: StopwatchResult;
}

export default function WorkoutOverview({ currentDay, workout, exercises, stopwatch }: WorkoutOverviewProps) {
	const navigate = useNavigate();
	const matches = useMediaQuery('(min-width: 106.25rem)');

	const remainingExercises = useMemo(() => exercises.filter((e) => e.sets !== e.setsCompleted).length, [exercises]);
	return (
		<div className="flex flex-col w-full gap-10 px-5 desktop:px-80">
			<div className="w-full flex justify-center">
				<div className="rainbow-box font-bold text-5xl w-fit md:text-2xl text-center text-snow-white p-0.5 shadow-md shadow-primary rounded-lg">
					<div className="bg-primary w-full rounded-lg px-6 desktop:py-2 desktop:px-12">{workout && workout.name.toUpperCase()}</div>
				</div>
			</div>
			<div className="flex items-center gap-10 w-full">
				<div className="basis-1/3 shrink-0 flex items-center gap-8 justify-start">
					<div className="flex gap-3">
						<CircleArrowLeft size={matches ? 50 : 40} className="hover-css text-red-400 hover:text-accent" onClick={() => navigate("/dashboard")} />
						{stopwatch.isRunning ? (
							<>
								<CirclePause size={matches ? 50 : 40} className="hover-css hover:text-yellow-400 text-yellow-500" onClick={stopwatch.pause} />
							</>
						) : (
							<>
								<CirclePlay size={matches ? 50 : 40} className="hover-css hover:text-green-400 text-green-500" onClick={stopwatch.start} />
							</>
						)}
					</div>
					<div className="desktop:text-6xl text-2xl text-primary font-bold">
						{currentDay.format("dddd").toUpperCase() + currentDay.format("DD")}
					</div>
				</div>
				<div className="flex gap-3 rounded-lg shadow-md bg-snow-white  w-1/4 desktop:w-full p-2 items-center justify-center grow">
					<span className="text-primary text-2xl desktop:text-5xl font-black rounded-lg bg-snow-white  py-1 desktop:py-2  w-1/2 desktop:w-full grow-0 shrink-0 text-center">
						{String(stopwatch.minutes).padStart(2, "0")}:{String(stopwatch.seconds).padStart(2, "0")}
					</span>
				</div>
				<div className="h-full text-2xl desktop:text-5xl text-primary font-bold flex justify-end items-center gap-4 shrink-0 basis-1/3">
					<span className="flex items-center justify-center text-4xl desktop:text-6xl inset-shadow-sm rounded-lg p-1 px-3 inset-shadow-primary/50">
						{remainingExercises}
					</span>
					exercises
				</div>
			</div>
		</div>
	);
}
