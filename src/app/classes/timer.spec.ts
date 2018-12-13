import { Timer } from './timer';

fdescribe('Timer', () => {
    it('should notify after', done => {
        const timer: Timer = new Timer(500);
        let success = false;
        timer.timeUp.subscribe(() => {
            // check the time
            success = true;
            timer.stop();
            done();
        });
        timer.start().then(() => {
            setTimeout(() => {
                if (success) { return; }
                console.log('failed');
                fail('timer should have notified');
                timer.stop();
                done();
            }, 1000);
        });
    });

    it('should be stopped', done => {
        const timer: Timer = new Timer(500);
        timer.timeUp.subscribe(() => {
            fail('should have been stopped');
            timer.stop();
            done();
        });
        timer.start().then(() => {
            setTimeout(() => {
                timer.stop();
            }, 200);
            setTimeout(() => {
                // pass if nothing notified
                done();
            }, 500);
        });
    });

    it('should be able to be restarted', done => {
        const timer: Timer = new Timer(300);
        let success = false;
        timer.timeUp.subscribe(() => {
            // check the time
            success = true;
            timer.stop();
            done();
        });
        timer.start().then(() => {
            setTimeout(() => {
                timer.stop();
                timer.start().then(() => {
                    setTimeout(() => {
                        if (success) { return; }
                        console.log('failed');
                        fail('timer should have notified');
                        timer.stop();
                        done();
                    }, 500);
                });
            }, 100);
        });
    });
});
