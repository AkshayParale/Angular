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

    getAvailableExercises() {
        return this.availableExercises.slice();
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({ ...this.runningExercise });
    }

    

    getRunningExercise() {
        return { ...this.runningExercise };
    }
}