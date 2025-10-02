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
		this.data.forEach(skill => {
			// создание элементов
			const dt = document.createElement('dt')
			const dd = document.createElement('dd')
			const skillLevel = document.createElement('div')
			const progressBar = document.createElement('div')
			
			// классы
			dt.classList.add('skill-item')
			skillLevel.classList.add('skill-level')
			
			dt.textContent = skill.name
			progressBar.textContent = `${skill.level}%`
			progressBar.style.width = `${skill.level}%`
			dt.style.backgroundImage = `url('./img/${skill.icon}')`
			
			// элементы
			skillLevel.appendChild(progressBar)
			dd.appendChild(skillLevel)
			
			// добавил на страницу
			parentElement.appendChild(dt)
			parentElement.appendChild(dd)
		})
	}
}

const skillList = document.querySelector('dl.skill-list')
skills.generateList(skillList)