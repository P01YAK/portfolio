const skills = {
	data: [
		{
			name: "html",
			level: 60,
			icon: "html.svg"
		},
		{
			name: "css", 
			level: 70,
			icon: "css.svg"
		},
		{
			name: "python",
			level: 80,
			icon: "python.svg"
		},
		{
			name: "c++",
			level: 55,
			icon: "cpp.svg"
		}
	],

	generateList(parentElement) {
		// очистка контейнера
		parentElement.innerHTML = '';
		this.data.forEach(skill => {
			// создание элементов
			const dt = document.createElement('dt');
			const dd = document.createElement('dd');
			const skillLevel = document.createElement('div');
			const progressBar = document.createElement('div');
			
			// классы
			dt.classList.add('skill-item');
			skillLevel.classList.add('skill-level');
			
			dt.textContent = skill.name;
			progressBar.textContent = `${skill.level}%`;
			progressBar.style.width = `${skill.level}%`;
			dt.style.backgroundImage = `url('./img/${skill.icon}')`;
			
			// элементы
			skillLevel.appendChild(progressBar);
			dd.appendChild(skillLevel);
			
			// добавил на страницу
			parentElement.appendChild(dt);
			parentElement.appendChild(dd);
		});
	},

	sortMode: null,

	sortList(type) {
		const prop = type === 'level' ? 'level' : 'name';
		if (this.sortMode !== type) {
			if (type === 'level') {
				this.data.sort((a, b) => getComparer('level')(b, a));
			} else {
				this.data.sort(getComparer(prop));
			}
			console.log(type === 'name' ? 'отсортировали данные по имени' : 'отсортировали данные по уровню');
			this.sortMode = type;
		} else {
			this.data.reverse();
			console.log('инвертировали порядок сортировки');
		}
		if (skillList) {
			this.generateList(skillList);
		}
	}
}

const skillList = document.querySelector('dl.skill-list');
skills.generateList(skillList);

// обработчик клика
const sortBtnsBlock = document.querySelector('.skills-sort');
	if (sortBtnsBlock) {
		sortBtnsBlock.addEventListener('click', (e) => {
			if (e.target && e.target.nodeName === 'BUTTON') {
				let target = e.target;
				switch (target.dataset.type) {
					case 'name':
						skills.sortList('name');
						break;
					case 'level':
						skills.sortList('level');
						break;
					default:
						console.log('неизвестная кнопка');
				}
			}
		})
	}

function getComparer(prop) {
	return function (a, b) {
		if (a[prop] < b[prop]) {
			return -1;
		}
		if (a[prop] > b[prop]) {
			return 1;
		}
		return 0;
	}
}

// меню
const mainNav = document.querySelector('.main-nav');
const navBtn = document.querySelector('.nav-btn');

console.log('mainNav:', mainNav);
console.log('navBtn:', navBtn);

if (mainNav && navBtn) {
  const menu = {
    open() {
      mainNav.classList.remove('main-nav_closed');
      navBtn.classList.remove('nav-btn_open');
      navBtn.classList.add('nav-btn_close');
      navBtn.innerHTML = '<span class="visually-hidden">Закрыть меню</span>';
    },
    close() {
      mainNav.classList.add('main-nav_closed');
      navBtn.classList.remove('nav-btn_close');
      navBtn.classList.add('nav-btn_open');
      navBtn.innerHTML = '<span class="visually-hidden">Открыть меню</span>';
    }
  };

  menu.close();

  navBtn.addEventListener('click', (e) => {
    const btn = e.currentTarget;
    if (btn && btn.classList.contains('nav-btn_open')) {
      menu.open();
    } else {
      menu.close();
    }
    console.log('Меню открыто:', !mainNav.classList.contains('main-nav_closed'));
  });
}
