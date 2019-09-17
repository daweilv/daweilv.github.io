import React, { Component } from 'react';
import classNames from 'classnames';
import './style.less';

export default class CButton extends Component {
    static defaultProps = {
        component: 'button',
        prefixCls: 'cine-btn',
        color: 'default',
        ripple: false,
    };

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.onClickDown = this.onClickDown.bind(this);
    }

    onClick(e) {
        const { onClick } = this.props;
        onClick && onClick();
    }

    onClickDown(e) {
        const { ripple } = this.props;
        if (ripple) {
            const ele = e.currentTarget || e.touches[0];
            const { top, left } = ele.getBoundingClientRect();
            const circle = ele.querySelector('.cine-ripple__circle');
            circle.style.left = `${e.clientX - left}px`;
            circle.style.top = `${e.clientY - top}px`;
            circle.addEventListener(
                'animationend',
                () => {
                    if (ele.classList.contains('cine-ripple--active')) ele.classList.remove('cine-ripple--active');
                },
                { once: true }
            );
            ele.classList.add('cine-ripple--active');
        }
    }

    render() {
        const {
            children,
            className,
            component,
            prefixCls,
            disabled,
            href,
            color,
            variant,
            ripple,
        } = this.props;
        let ComponentProp = component;
        if (component === 'button' && href) {
            ComponentProp = 'a';
        }
        return (
            <ComponentProp
                className={classNames(
                    `${prefixCls}`,
                    {
                        'cine-ripple': ripple,
                        [`${prefixCls}--${color}`]: !!color,
                        [`${prefixCls}--${variant}`]: !!variant,
                        [`${prefixCls}--disabled`]: disabled,
                    },
                    className
                )}
                disabled={disabled}
                onClick={this.onClick}
                onMouseDown={this.onClickDown}
                onTouchStart={this.onClickDown}
                href={href}>
                {children}
                {ripple && <span className="cine-ripple__circle" />}
            </ComponentProp>
        );
    }
}
