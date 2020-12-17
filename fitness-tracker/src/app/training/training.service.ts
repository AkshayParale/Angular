import { Subject } from 'rxjs';
import { Exercise } from './exercise.model';

export class TrainingService{
    exerciseChanged = new Subject<Exercise>();
    private availableExercises: Exercise[] = [
       {id:'crunches', name:'crunches', duration:30, calories:8},
       {id:'touch-toes', name:'touch-toes', duration:180, calories:4},
       {id:'side-lunges', name:'side-lunges', duration:120, calories:32}, 
       {id:'burpees', name:'burpees', duration:60, calories:23} 
    ];

    private runningExercise: Exercise;
    private exercises: Exercise[] = [];
    getAvailableExercises() {
        return this.availableExercises.slice();
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    completeExercise() {
        this.exercises.push({
            ...this.runningExercise,
            date: new Date(),
            state: 'completed'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.exercises.push({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    getRunningExercise() {
        return { ...this.runningExercise };
    }

    getCompletedOrCancelledExercises() {
        return this.exercises.slice();
    }
}