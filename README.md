# Modèle de Markov appliqué aux textes pour la prédiction de saisie au clavier

## Description

Ce projet implémente un modèle de Markov de premier ordre entraîné sur un corpus de textes littéraires français (contes, fables). Il permet deux types de prédiction :

- Compléter le mot : suggère les mots les plus fréquents correspondant à un préfixe saisi
- Prédiction du mot suivant : prédit les mots les plus probables après un mot donné

## Utilisation

### Générer les fichiers de données

```bash
npm run dic # Génère dictionnaire.json
npm run pred  # Génère predictions.json
```

### Tester les modèles

```bash
npm run testdic # Lance les scripts de test dictionnaire
npm run testpred # Lance les scripts de test prediction
```

## Détails techniques

### Dictionnaire de fréquences (`dictionnaire.json`)

création d'un dictionnaire à partir de tous les mots du corpus.
Chaque mot est associé à une fréquence (entre 0 et 1) qui indique à quel point il apparaît souvent dans les textes.
Pour ça, on utilise R.countBy.

### Modèle de Markov (`predictions.json`)

Pour chaque mot, on regarde quels mots peuvent venir juste après dans les textes.
On enregistre ces mots avec leur fréquence (normalisée entre 0 et 1).

On utilise une boucle for classique pour construire le dictionnaire, car c’est beaucoup plus rapide que certaines méthodes fonctionnelles (comme R.reduce avec le spread operator) sur de gros volumes de données.

### Nettoyage du texte

Avant de traiter les textes, on les nettoie :

- Suppression des parties inutiles (en-têtes et pieds de page du Projet Gutenberg)
- Passage en minuscules
- Suppression de la ponctuation et des caractères spéciaux
- Découpage en mots

Textes utilisés :
- Jules Lemaître : Petits Contes
- Fables de la Fontaine
- Maupassant : Contes du jour et de la nuit
