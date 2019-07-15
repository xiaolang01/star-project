
cc.Class({
    extends: cc.Component,

    properties: {
        // ������Ծ�߶�
        jumpHeight: 0,
        // ������Ծ����ʱ��
        jumpDuration: 0,
        // ����ƶ��ٶ�
        maxMoveSpeed: 0,
        // ���ٶ�
        accel: 0,
    },

    
    setJumpAction: function () {
        // ��Ծ����
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // ����
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        // �����ظ�
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    },

    onKeyDown(event) {
        // set a flag when key pressed
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
        }
    },

    onKeyUp(event) {
        // unset a flag when key released
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
        }
    },

    onLoad: function () {
        // ��ʼ����Ծ����
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);

        // ���ٶȷ��򿪹�
        this.accLeft = false;
        this.accRight = false;
        // ���ǵ�ǰˮƽ�����ٶ�
        this.xSpeed = 0;

        // ��ʼ�������������
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },


    onDestroy() {
        // ȡ�������������
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    start () {

    },
    
    update: function (dt) {
        // ���ݵ�ǰ���ٶȷ���ÿ֡�����ٶ�
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        } else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        // �������ǵ��ٶȲ��ܳ������ֵ
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        // ���ݵ�ǰ�ٶȸ������ǵ�λ��
        this.node.x += this.xSpeed * dt;
    },
});
